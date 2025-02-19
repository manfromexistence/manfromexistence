import type { ExtendConfig } from '@udecode/plate';

import { toTPlatePlugin } from '@udecode/plate/react';

import type { buildToggleIndex } from './toggleIndexAtom';

import {
  type BaseToggleConfig,
  BaseTogglePlugin,
} from '../lib/BaseTogglePlugin';
import { renderToggleAboveNodes } from './renderToggleAboveNodes';
import { useHooksToggle } from './useHooksToggle';
import { withToggle } from './withToggle';

export type ToggleConfig = ExtendConfig<
  BaseToggleConfig,
  {
    toggleIndex?: ReturnType<typeof buildToggleIndex>;
  }
>;

/** Enables support for toggleable elements in the editor. */
export const TogglePlugin = toTPlatePlugin<ToggleConfig>(BaseTogglePlugin, {
  options: {
    toggleIndex: new Map(),
  },
  render: {
    aboveNodes: renderToggleAboveNodes,
  },
  useHooks: useHooksToggle as any,
}).overrideEditor(withToggle);
