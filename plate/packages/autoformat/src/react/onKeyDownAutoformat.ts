import type { KeyboardHandler } from '@udecode/plate/react';

import { isHotkey, RangeApi } from '@udecode/plate';

import type { AutoformatConfig } from '../lib/BaseAutoformatPlugin';
import type { AutoformatRule, AutoformatTextRule } from '../lib/types';

export const onKeyDownAutoformat: KeyboardHandler<AutoformatConfig> = ({
  editor,
  event,
  getOptions,
}) => {
  const { enableUndoOnDelete, rules } = getOptions();

  if (event.defaultPrevented) return false;
  // Abort quicky if hotKey was not pressed.
  if (!isHotkey('backspace', { byKey: true }, event)) return false;
  if (!rules) return false;
  if (!enableUndoOnDelete) return false;

  // Abort if selection is not collapsed i.e. we're not deleting single character.
  const { selection } = editor;

  if (!selection || !editor.api.isCollapsed()) return;

  // Get start and end point of selection.
  // For example: Text|
  //                  ^ cursor at the moment of pressing the hotkey
  // start, end will be equal to the location of the |
  const [start, end] = RangeApi.edges(selection);

  // Get location before the cursor.
  // before will be a point one character before | so:
  // Text|
  //    ^
  const before = editor.api.before(end, {
    distance: 1,
    unit: 'character',
  });

  if (!start) return false;
  if (!before) return false;

  // Abort if there doesn't exist a valid character to replace.
  const charRange = { anchor: before, focus: start };

  if (!charRange) return false;

  // Text|
  //    ^
  // Between ^ and | is t
  const char = editor.api.string(charRange);

  if (!char) return false;

  const matchers: AutoformatRule[] = [...rules].filter((rule) => {
    const textRule = rule as AutoformatTextRule;

    if (textRule) {
      return textRule.mode === 'text' && textRule.format === char;
    }

    return false;
  });

  // abort if no matching substitution is found.
  if (!matchers || matchers.length === 0) return false;

  event.preventDefault();

  // remove the shorthand character.
  editor.tf.deleteBackward();

  // put back the orignal characters. This could match to a single string or an array.
  const rule = matchers[0] as AutoformatTextRule;

  if (rule && typeof rule.match === 'string') {
    editor.tf.insertText(rule.match);
  } else {
    const matchArray = rule.match as string[];

    if (matchArray && matchArray.length > 0) {
      editor.tf.insertText(matchArray[0]);
    }
  }

  return true;
};
