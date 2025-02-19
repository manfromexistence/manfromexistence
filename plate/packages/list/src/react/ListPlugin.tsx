import { Key, toPlatePlugin } from '@udecode/plate/react';

import {
  BaseBulletedListPlugin,
  BaseListItemContentPlugin,
  BaseListItemPlugin,
  BaseListPlugin,
  BaseNumberedListPlugin,
} from '../lib';
import { onKeyDownList } from './onKeyDownList';
import { withList } from './withList';

export const BulletedListPlugin = toPlatePlugin(BaseBulletedListPlugin, {
  dependencies: ['list'],
  handlers: {
    onKeyDown: onKeyDownList,
  },
});

export const NumberedListPlugin = toPlatePlugin(BaseNumberedListPlugin, {
  dependencies: ['list'],
  handlers: {
    onKeyDown: onKeyDownList,
  },
});

export const ListItemContentPlugin = toPlatePlugin(BaseListItemContentPlugin);

export const ListItemPlugin = toPlatePlugin(BaseListItemPlugin);

/**
 * Enables support for bulleted, numbered and to-do lists with React-specific
 * features.
 */
export const ListPlugin = toPlatePlugin(BaseListPlugin, {
  plugins: [
    BulletedListPlugin,
    NumberedListPlugin,
    ListItemPlugin,
    ListItemContentPlugin,
  ],
})
  .overrideEditor(withList)
  .extend(({ editor }) => ({
    shortcuts: {
      toggleBulletedList: {
        keys: [[Key.Mod, Key.Alt, '5']],
        preventDefault: true,
        handler: () => {
          editor.getTransforms(ListPlugin).toggle.bulletedList();
        },
      },
      toggleNumberedList: {
        keys: [[Key.Mod, Key.Alt, '6']],
        preventDefault: true,
        handler: () => {
          editor.getTransforms(ListPlugin).toggle.numberedList();
        },
      },
    },
  }));
