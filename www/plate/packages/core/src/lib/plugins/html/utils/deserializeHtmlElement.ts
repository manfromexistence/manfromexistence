import type { SlateEditor } from '../../../editor';
import type { DeserializeHtmlNodeReturnType } from '../types';

import { deserializeHtmlNode } from './deserializeHtmlNode';

/** Deserialize HTML element to fragment. */
export const deserializeHtmlElement = (
  editor: SlateEditor,
  element: HTMLElement
): DeserializeHtmlNodeReturnType => {
  return deserializeHtmlNode(editor)(element);
};
