import type { TNodeEntry } from '@udecode/slate';
import type { TEditableProps } from '@udecode/slate-react';
import type { Range } from 'slate';

import type { SlateEditor } from '../../editor';

import { getEditorPlugin } from '../../plugin';

/**
 * @see {@link Decorate} .
 * Optimization: return undefined if empty list so Editable uses a memo.
 */
export const pipeDecorate = (
  editor: SlateEditor,
  decorateProp?:
    | ((ctx: { editor: SlateEditor; entry: TNodeEntry }) => Range[] | undefined)
    | null
): TEditableProps['decorate'] => {
  const relevantPlugins = editor.pluginList.filter((plugin) => plugin.decorate);

  if (relevantPlugins.length === 0 && !decorateProp) return;

  return (entry: TNodeEntry) => {
    let ranges: Range[] = [];

    const addRanges = (newRanges?: Range[]) => {
      if (newRanges?.length) ranges = [...ranges, ...newRanges];
    };

    relevantPlugins.forEach((plugin) => {
      addRanges(
        plugin.decorate!({
          ...(getEditorPlugin(editor, plugin) as any),
          entry,
        })
      );
    });

    if (decorateProp) {
      addRanges(
        decorateProp({
          editor,
          entry,
        })
      );
    }

    return ranges;
  };
};
