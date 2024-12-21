import {
  type InsertNodesOptions,
  type SlateEditor,
  insertNodes,
} from '@udecode/plate-common';

import { type TCalloutElement, BaseCalloutPlugin } from '../BaseCalloutPlugin';

export const CALLOUT_STORAGE_KEY = `plate-storage-callout`;

export const insertCallout = <E extends SlateEditor>(
  editor: E,
  {
    icon,
    variant,
    ...options
  }: InsertNodesOptions<E> & {
    icon?: string;
    variant?: (string & {}) | TCalloutElement['variant'];
  } = {}
) => {
  insertNodes<TCalloutElement>(
    editor,
    {
      children: [{ text: '' }],
      icon: icon ?? localStorage.getItem(CALLOUT_STORAGE_KEY) ?? '💡',
      type: editor.getType(BaseCalloutPlugin),
      variant,
    },
    options as any
  );
};
