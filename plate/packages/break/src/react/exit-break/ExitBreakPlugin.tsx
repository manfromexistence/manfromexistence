import { toPlatePlugin } from '@udecode/plate/react';

import { BaseExitBreakPlugin } from '../../lib/exit-break/BaseExitBreakPlugin';
import { onKeyDownExitBreak } from './onKeyDownExitBreak';

export const ExitBreakPlugin = toPlatePlugin(BaseExitBreakPlugin, {
  handlers: {
    onKeyDown: onKeyDownExitBreak,
  },
});
