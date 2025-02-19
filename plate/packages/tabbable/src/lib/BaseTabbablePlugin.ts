import { type PluginConfig, createTSlatePlugin } from '@udecode/plate';

import type { TabbableEntry } from './types';

export type TabblableConfig = PluginConfig<
  'tabbable',
  {
    /**
     * When true, the plugin will add its event listener to the document instead
     * of the editor, allowing it to capture events from outside the editor.
     *
     * @default: false
     */
    globalEventListener?: boolean;
    /**
     * Add additional tabbables to the list of tabbables. Useful for adding
     * tabbables that are not contained within the editor. Ignores
     * `isTabbable`.
     *
     * @default: () => []
     */
    insertTabbableEntries?: (event: KeyboardEvent) => TabbableEntry[];
    /**
     * Determine whether an element should be included in the tabbable list.
     *
     * @default: (editor, tabbableEntry) => editor.api.isVoid(tabbableEntry.slateNode)
     */
    isTabbable?: (entry: TabbableEntry) => boolean;
    /**
     * Dynamically enable or disable the plugin.
     *
     * @default: () => true
     */
    query?: (event: KeyboardEvent) => boolean;
  }
>;

export const BaseTabbablePlugin = createTSlatePlugin<TabblableConfig>({
  key: 'tabbable',
  options: {
    globalEventListener: false,
    insertTabbableEntries: () => [],
    query: () => true,
  },
}).extend(({ editor }) => ({
  options: {
    isTabbable: (tabbableEntry) => editor.api.isVoid(tabbableEntry.slateNode),
  },
}));
