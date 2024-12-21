import type { SlateEditor, TText } from '@udecode/plate-common';

import type { TLinkElement } from '../types';

import { BaseLinkPlugin } from '../BaseLinkPlugin';

export interface CreateLinkNodeOptions {
  url: string;
  children?: TText[];
  target?: string;
  text?: string;
}

export const createLinkNode = (
  editor: SlateEditor,
  { children, target, text = '', url }: CreateLinkNodeOptions
): TLinkElement => {
  const type = editor.getType(BaseLinkPlugin);

  return {
    children: children ?? [{ text }],
    target,
    type,
    url,
  };
};
