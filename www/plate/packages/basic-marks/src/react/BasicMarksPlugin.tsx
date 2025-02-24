import { toPlatePlugin } from '@udecode/plate/react';

import { BaseBasicMarksPlugin } from '../lib/BaseBasicMarksPlugin';
import { BoldPlugin } from './BoldPlugin';
import { CodePlugin } from './CodePlugin';
import { ItalicPlugin } from './ItalicPlugin';
import { StrikethroughPlugin } from './StrikethroughPlugin';
import { SubscriptPlugin } from './SubscriptPlugin';
import { SuperscriptPlugin } from './SuperscriptPlugin';
import { UnderlinePlugin } from './UnderlinePlugin';

/**
 * Enables support for basic marks:
 *
 * - Bold
 * - Code
 * - Italic
 * - Strikethrough
 * - Subscript
 * - Superscript
 * - Underline
 */
export const BasicMarksPlugin = toPlatePlugin(BaseBasicMarksPlugin, {
  plugins: [
    BoldPlugin,
    CodePlugin,
    ItalicPlugin,
    StrikethroughPlugin,
    SubscriptPlugin,
    SuperscriptPlugin,
    UnderlinePlugin,
  ],
});
