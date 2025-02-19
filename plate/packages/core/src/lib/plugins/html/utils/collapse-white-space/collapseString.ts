import type { TrimEndRule, TrimStartRule } from './types';

export const collapseString = (
  text: string,
  {
    shouldCollapseWhiteSpace = true,
    trimEnd = 'collapse',
    trimStart = 'collapse',
    whiteSpaceIncludesNewlines = true,
  }: {
    shouldCollapseWhiteSpace?: boolean;
    trimEnd?: TrimEndRule;
    trimStart?: TrimStartRule;
    whiteSpaceIncludesNewlines?: boolean;
  } = {}
) => {
  if (trimStart === 'all') {
    text = text.replace(/^\s+/, '');
  }
  if (trimEnd === 'single-newline') {
    // Strip at most one newline from the end
    text = text.replace(/\n$/, '');
  }
  if (shouldCollapseWhiteSpace) {
    if (whiteSpaceIncludesNewlines) {
      text = text.replaceAll(/\s+/g, ' ');
    } else {
      // Collapse horizontal whitespace
      text = text.replaceAll(/[^\S\n\r]+/g, ' ');

      /**
       * Trim horizontal whitespace from the start and end of lines (behavior of
       * pre-line).
       */
      text = text.replaceAll(/^[^\S\n\r]+/gm, '');
      text = text.replaceAll(/[^\S\n\r]+$/gm, '');
    }
  }

  return text;
};
