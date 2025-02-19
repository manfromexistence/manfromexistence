import { type SlateEditor, type TRange, isHotkey } from '@udecode/plate';

import { getCellTypes, KEY_SHIFT_EDGES } from '..';
import { moveSelectionFromCell } from './moveSelectionFromCell';

/**
 * Override the new selection if the previous selection and the new one are in
 * different cells.
 */
export const overrideSelectionFromCell = (
  editor: SlateEditor,
  newSelection?: TRange | null
) => {
  let hotkey: string | undefined;

  if (
    !editor.currentKeyboardEvent ||
    !['up', 'down', 'shift+up', 'shift+right', 'shift+down', 'shift+left'].some(
      (key) => {
        const valid = isHotkey(key, editor.currentKeyboardEvent!);

        if (valid) hotkey = key;

        return valid;
      }
    ) ||
    !editor.selection?.focus ||
    !newSelection?.focus ||
    !editor.api.isAt({
      at: {
        anchor: editor.selection.focus,
        focus: newSelection.focus,
      },
      blocks: true,
      match: { type: getCellTypes(editor) },
    })
  ) {
    return;
  }
  if (!hotkey) return;

  const edge = (KEY_SHIFT_EDGES as any)[hotkey];

  // if the previous selection was in many cells, return
  if (
    edge &&
    !editor.api.isAt({ block: true, match: { type: getCellTypes(editor) } })
  ) {
    return;
  }

  const prevSelection = editor.selection;
  const reverse = ['shift+up', 'up'].includes(hotkey);

  setTimeout(() => {
    moveSelectionFromCell(editor, {
      at: prevSelection,
      edge,
      fromOneCell: true,
      reverse,
    });
  }, 0);
};
