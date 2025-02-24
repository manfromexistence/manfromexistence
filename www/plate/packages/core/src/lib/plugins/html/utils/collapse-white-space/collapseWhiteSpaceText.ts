import type {
  CollapseWhiteSpaceState,
  TrimEndRule,
  TrimStartRule,
} from './types';

import { collapseString } from './collapseString';
import { isLastNonEmptyTextOfInlineFormattingContext } from './isLastNonEmptyTextOfInlineFormattingContext';
import { upsertInlineFormattingContext } from './stateTransforms';

export const collapseWhiteSpaceText = (
  text: Text,
  state: CollapseWhiteSpaceState
) => {
  const textContent = text.textContent || '';
  const isWhiteSpaceOnly = textContent.trim() === '';

  /**
   * Do not start an inline formatting context with a text node containing only
   * white space.
   */
  if (state.inlineFormattingContext || !isWhiteSpaceOnly) {
    upsertInlineFormattingContext(state);
  }

  const { whiteSpaceRule } = state;

  /**
   * Note: Due to the way HTML strings are parsed in htmlStringToDOMNode, up to
   * one newline is already trimmed from the start of text nodes inside <pre>
   * elements. If we do so again here, we may remove too many newlines. This
   * only applies to actual <pre> elements, not elements with the white-space
   * CSS property.
   */
  const trimStart: TrimStartRule = (() => {
    if (whiteSpaceRule !== 'normal') return 'collapse';
    if (
      !state.inlineFormattingContext ||
      state.inlineFormattingContext.atStart ||
      state.inlineFormattingContext.lastHasTrailingWhiteSpace
    )
      return 'all';

    return 'collapse';
  })();

  const trimEnd: TrimEndRule = (() => {
    if (whiteSpaceRule === 'normal') return 'collapse';
    if (isLastNonEmptyTextOfInlineFormattingContext(text))
      return 'single-newline';

    return 'collapse';
  })();

  const shouldCollapseWhiteSpace: boolean = {
    normal: true,
    pre: false,
    'pre-line': true,
  }[whiteSpaceRule];

  const whiteSpaceIncludesNewlines = whiteSpaceRule !== 'pre-line';

  const collapsedTextContent = collapseString(textContent || '', {
    shouldCollapseWhiteSpace,
    trimEnd,
    trimStart,
    whiteSpaceIncludesNewlines,
  });

  if (state.inlineFormattingContext && shouldCollapseWhiteSpace) {
    state.inlineFormattingContext.lastHasTrailingWhiteSpace =
      collapsedTextContent.endsWith(' ');
  }

  text.textContent = collapsedTextContent;
};
