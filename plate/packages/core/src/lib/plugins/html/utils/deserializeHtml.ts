import type { Descendant } from '@udecode/slate';

import type { SlateEditor } from '../../../editor';
import type { WithRequiredKey } from '../../../plugin';

import { normalizeDescendantsToDocumentFragment } from '../../../utils/normalizeDescendantsToDocumentFragment';
import { collapseWhiteSpace } from './collapse-white-space';
import { deserializeHtmlElement } from './deserializeHtmlElement';
import { htmlStringToDOMNode } from './htmlStringToDOMNode';

/** Deserialize HTML element to a valid document fragment. */
export const deserializeHtml = (
  editor: SlateEditor,
  {
    collapseWhiteSpace: shouldCollapseWhiteSpace = true,
    defaultElementPlugin,
    element,
  }: {
    element: HTMLElement | string;
    collapseWhiteSpace?: boolean;
    defaultElementPlugin?: WithRequiredKey;
  }
): Descendant[] => {
  // for serializer
  if (typeof element === 'string') {
    element = htmlStringToDOMNode(element);
  }
  if (shouldCollapseWhiteSpace) {
    element = collapseWhiteSpace(element);
  }

  const fragment = deserializeHtmlElement(editor, element) as Descendant[];

  return normalizeDescendantsToDocumentFragment(editor, {
    defaultElementPlugin,
    descendants: fragment,
  });
};
