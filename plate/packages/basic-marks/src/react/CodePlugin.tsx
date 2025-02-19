import { Key, toPlatePlugin } from '@udecode/plate/react';

import { BaseCodePlugin } from '../lib/BaseCodePlugin';

export const CodePlugin = toPlatePlugin(BaseCodePlugin, ({ editor, type }) => ({
  shortcuts: {
    toggleCode: {
      keys: [[Key.Mod, 'e']],
      preventDefault: true,
      handler: () => {
        editor.tf.toggleMark(type);
      },
    },
  },
}));
