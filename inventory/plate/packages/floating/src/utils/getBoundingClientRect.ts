import { type TEditor, getRange } from '@udecode/plate-common';
import { toDOMRange } from '@udecode/plate-common/react';
import { type Location, type Range, Path } from 'slate';

import { mergeClientRects } from './mergeClientRects';

export const getBoundingClientRect = (
  editor: TEditor,
  at?: Location | Location[]
): DOMRect | undefined => {
  const atRanges: Range[] = (() => {
    if (!at) return [editor.selection].filter(Boolean) as Range[];

    const atArray = Array.isArray(at) && !Path.isPath(at) ? at : [at];

    return atArray.map((location) => getRange(editor, location));
  })();

  const clientRects = atRanges
    .map((range) => toDOMRange(editor, range)?.getBoundingClientRect())
    .filter(Boolean) as DOMRect[];

  if (clientRects.length === 0) return undefined;

  return mergeClientRects(clientRects);
};
