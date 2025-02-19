import { toPlatePlugin } from '@udecode/plate/react';

import { BaseSingleLinePlugin } from '../../lib/single-line/BaseSingleLinePlugin';
import { onKeyDownSingleLine } from './onKeyDownSingleLine';

export const SingleLinePlugin = toPlatePlugin(BaseSingleLinePlugin, {
  handlers: {
    onKeyDown: onKeyDownSingleLine,
  },
});
