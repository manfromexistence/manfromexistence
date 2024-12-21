import {
  type GetNodeEntriesOptions,
  type SlateEditor,
  createPathRef,
  getNodeEntries,
  getParentNode,
  withoutNormalizing,
} from '@udecode/plate-common';
import { type PathRef, Path } from 'slate';

import { BaseListItemContentPlugin } from '../BaseListPlugin';
import { isListNested } from '../queries/isListNested';
import { moveListItemDown } from './moveListItemDown';
import { moveListItemUp } from './moveListItemUp';
import { removeFirstListItem } from './removeFirstListItem';

export type MoveListItemsOptions = {
  at?: GetNodeEntriesOptions['at'];
  enableResetOnShiftTab?: boolean;
  increase?: boolean;
};

export const moveListItems = (
  editor: SlateEditor,
  {
    at = editor.selection ?? undefined,
    enableResetOnShiftTab,
    increase = true,
  }: MoveListItemsOptions = {}
) => {
  const _nodes = getNodeEntries(editor, {
    at,
    match: {
      type: editor.getType(BaseListItemContentPlugin),
    },
  });

  // Get the selected lic
  const lics = Array.from(_nodes);

  if (lics.length === 0) return;

  const highestLicPaths: Path[] = [];
  const highestLicPathRefs: PathRef[] = [];

  // Filter out the nested lic, we just need to move the highest ones
  lics.forEach((lic) => {
    const licPath = lic[1];
    const liPath = Path.parent(licPath);

    const isAncestor = highestLicPaths.some((path) => {
      const highestLiPath = Path.parent(path);

      return Path.isAncestor(highestLiPath, liPath);
    });

    if (!isAncestor) {
      highestLicPaths.push(licPath);
      highestLicPathRefs.push(createPathRef(editor, licPath));
    }
  });

  const licPathRefsToMove = increase
    ? highestLicPathRefs
    : highestLicPathRefs.reverse();

  return withoutNormalizing(editor, () => {
    let moved = false;

    licPathRefsToMove.forEach((licPathRef) => {
      const licPath = licPathRef.unref();

      if (!licPath) return;

      const listItem = getParentNode(editor, licPath);

      if (!listItem) return;

      const parentList = getParentNode(editor, listItem[1]);

      if (!parentList) return;

      let _moved: any;

      if (increase) {
        _moved = moveListItemDown(editor, {
          list: parentList as any,
          listItem: listItem as any,
        });
      } else if (isListNested(editor, parentList[1])) {
        // un-indent a sub-list item
        _moved = moveListItemUp(editor, {
          list: parentList as any,
          listItem: listItem as any,
        });
      } else if (enableResetOnShiftTab) {
        // unindenting a top level list item, effectively breaking apart the list.
        _moved = removeFirstListItem(editor, {
          list: parentList as any,
          listItem: listItem as any,
        });
      }

      moved = _moved || moved;
    });

    return moved;
  });
};
