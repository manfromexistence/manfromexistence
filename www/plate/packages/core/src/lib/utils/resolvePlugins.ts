import {
  assignLegacyApi,
  assignLegacyTransforms,
  syncLegacyMethods,
} from '@udecode/slate';
import { isDefined } from '@udecode/utils';
import merge from 'lodash/merge.js';
import { createZustandStore } from 'zustand-x';

import type { SlateEditor } from '../editor';

import { resolvePlugin } from '../../internal/plugin/resolvePlugin';
import { mergePlugins } from '../../internal/utils/mergePlugins';
import {
  type SlatePlugin,
  type SlatePlugins,
  getEditorPlugin,
} from '../plugin';

/**
 * Initialize and configure the editor's plugin system. This function sets up
 * the editor's plugins, resolving core and custom plugins, and applying any
 * overrides specified in the plugins.
 */
export const resolvePlugins = (
  editor: SlateEditor,
  plugins: SlatePlugins = []
) => {
  editor.pluginList = [];
  editor.plugins = {};
  editor.shortcuts = {} as any;

  const resolvedPlugins = resolveAndSortPlugins(editor, plugins);

  applyPluginsToEditor(editor, resolvedPlugins);

  resolvePluginOverrides(editor);

  resolvePluginStores(editor);

  // extendEditor
  editor.pluginList.forEach((plugin) => {
    if (plugin.extendEditor) {
      editor = plugin.extendEditor(getEditorPlugin(editor, plugin) as any);

      // Sync any editor methods that were modified by extendEditor
      syncLegacyMethods(editor);
    }

    // Sync overridden plugin methods to legacy editor methods
    resolvePluginMethods(editor, plugin);
  });

  resolvePluginShortcuts(editor);

  return editor;
};

const resolvePluginStores = (editor: SlateEditor) => {
  // Create zustand stores for each plugin
  editor.pluginList.forEach((plugin) => {
    let store = createZustandStore(plugin.options, {
      mutative: true,
      name: plugin.key,
    });

    // Apply option extensions
    if (
      (plugin as any).__selectorExtensions &&
      (plugin as any).__selectorExtensions.length > 0
    ) {
      (plugin as any).__selectorExtensions.forEach((extension: any) => {
        const extendedOptions = extension(getEditorPlugin(editor, plugin));

        store = store.extendSelectors(() => extendedOptions);
      });
    }

    plugin.optionsStore = store;
  });
};

const resolvePluginMethods = (editor: SlateEditor, plugin: any) => {
  // Merge APIs
  Object.entries(plugin.api).forEach(([apiKey, apiFunction]) => {
    (editor.api as any)[apiKey] = apiFunction;
  });

  // Apply API and transform extensions
  if (plugin.__apiExtensions && plugin.__apiExtensions.length > 0) {
    plugin.__apiExtensions.forEach(
      ({ extension, isOverride, isPluginSpecific, isTransform }: any) => {
        const newExtensions = extension(getEditorPlugin(editor, plugin) as any);

        if (isOverride) {
          // Handle combined API and transforms override
          if (newExtensions.api) {
            merge(editor.api, newExtensions.api);
            merge(plugin.api, newExtensions.api);
            assignLegacyApi(editor, editor.api);
          }
          if (newExtensions.transforms) {
            merge(editor.transforms, newExtensions.transforms);
            merge(plugin.transforms, newExtensions.transforms);
            assignLegacyTransforms(editor, newExtensions.transforms);
          }
        } else if (isTransform) {
          // Handle transforms
          if (isPluginSpecific) {
            // Plugin-specific transform
            if (!(editor.transforms as any)[plugin.key]) {
              (editor.transforms as any)[plugin.key] = {};
            }
            if (!(plugin.transforms as any)[plugin.key]) {
              (plugin.transforms as any)[plugin.key] = {};
            }

            merge((editor.transforms as any)[plugin.key], newExtensions);
            merge((plugin.transforms as any)[plugin.key], newExtensions);
          } else {
            // Editor-wide transform
            merge(editor.transforms, newExtensions);
            merge(plugin.transforms, newExtensions);
            assignLegacyTransforms(editor, newExtensions);
          }
        } else {
          // Handle APIs
          if (isPluginSpecific) {
            // Plugin-specific API
            if (!(editor.api as any)[plugin.key]) {
              (editor.api as any)[plugin.key] = {};
            }
            if (!(plugin.api as any)[plugin.key]) {
              (plugin.api as any)[plugin.key] = {};
            }

            merge((editor.api as any)[plugin.key], newExtensions);
            merge((plugin.api as any)[plugin.key], newExtensions);
          } else {
            // Editor-wide API
            merge(editor.api, newExtensions);
            merge(plugin.api, newExtensions);
            assignLegacyApi(editor, editor.api);
          }
        }
      }
    );
    delete plugin.__apiExtensions;
  }
};

const resolvePluginShortcuts = (editor: SlateEditor) => {
  const shortcutsByPriority: any[] = [];

  editor.pluginList.forEach((plugin) => {
    // Merge shortcuts
    Object.entries(plugin.shortcuts).forEach(([key, hotkey]) => {
      if (hotkey === null) {
        // Remove any existing hotkey with this key
        const index = shortcutsByPriority.findIndex((item) => item.key === key);

        if (index !== -1) {
          shortcutsByPriority.splice(index, 1);
        }
      } else {
        const priority = (hotkey as any).priority ?? plugin.priority;
        const existingIndex = shortcutsByPriority.findIndex(
          (item) => item.key === key
        );

        if (
          existingIndex === -1 ||
          priority >= shortcutsByPriority[existingIndex].priority
        ) {
          if (existingIndex !== -1) {
            shortcutsByPriority.splice(existingIndex, 1);
          }

          shortcutsByPriority.push({ key, hotkey, priority });
        }
      }
    });
  });

  // Sort shortcuts by priority (descending)
  shortcutsByPriority.sort((a, b) => b.hotkey.priority - a.hotkey.priority);

  // After processing all plugins, set the final shortcuts on the editor
  editor.shortcuts = Object.fromEntries(
    shortcutsByPriority.map(({ key, hotkey }) => {
      const { priority, ...hotkeyWithoutPriority } = hotkey;

      return [key, hotkeyWithoutPriority];
    })
  );
};

const flattenAndResolvePlugins = (
  editor: SlateEditor,
  plugins: SlatePlugins
): Map<string, SlatePlugin> => {
  const pluginMap = new Map<string, SlatePlugin>();

  const processPlugin = (plugin: SlatePlugin) => {
    const resolvedPlugin = resolvePlugin(editor, plugin);
    const existingPlugin = pluginMap.get(resolvedPlugin.key);

    if (existingPlugin) {
      pluginMap.set(
        resolvedPlugin.key,
        mergePlugins(existingPlugin, resolvedPlugin)
      );
    } else {
      pluginMap.set(resolvedPlugin.key, resolvedPlugin);
    }
    if (resolvedPlugin.plugins && resolvedPlugin.plugins.length > 0) {
      resolvedPlugin.plugins.forEach(processPlugin);
    }
  };

  plugins.forEach(processPlugin);

  return pluginMap;
};

export const resolveAndSortPlugins = (
  editor: SlateEditor,
  plugins: SlatePlugins
): SlatePlugins => {
  // Step 1: Resolve, flatten, and merge all plugins
  const pluginMap = flattenAndResolvePlugins(editor, plugins);

  // Step 2: Filter out disabled plugins
  const enabledPlugins = Array.from(pluginMap.values()).filter(
    (plugin) => plugin.enabled !== false
  );

  // Step 3: Sort plugins by priority
  enabledPlugins.sort((a, b) => b.priority - a.priority);

  // Step 4: Reorder based on dependencies
  const orderedPlugins: SlatePlugins = [];
  const visited = new Set<string>();

  const visit = (plugin: SlatePlugin) => {
    if (visited.has(plugin.key)) return;

    visited.add(plugin.key);

    plugin.dependencies?.forEach((depKey) => {
      const depPlugin = pluginMap.get(depKey);

      if (depPlugin) {
        visit(depPlugin);
      } else {
        editor.api.debug.warn(
          `Plugin "${plugin.key}" depends on missing plugin "${depKey}"`,
          'PLUGIN_DEPENDENCY_MISSING'
        );
      }
    });

    orderedPlugins.push(plugin);
  };

  enabledPlugins.forEach(visit);

  return orderedPlugins;
};

export const applyPluginsToEditor = (
  editor: SlateEditor,
  plugins: SlatePlugins
) => {
  editor.pluginList = plugins;
  editor.plugins = Object.fromEntries(
    plugins.map((plugin) => [plugin.key, plugin])
  );
};

export const resolvePluginOverrides = (editor: SlateEditor) => {
  const applyOverrides = (plugins: SlatePlugin[]): SlatePlugin[] => {
    let overriddenPlugins = [...plugins];

    const enabledOverrides: Record<string, boolean> = {};
    const componentOverrides: Record<
      string,
      { component: any; priority: number }
    > = {};
    const pluginOverrides: Record<string, Partial<SlatePlugin>> = {};

    // Collect all overrides
    for (const plugin of plugins) {
      if (plugin.override.enabled) {
        Object.assign(enabledOverrides, plugin.override.enabled);
      }
      // TODO react
      if ((plugin.override as any).components) {
        Object.entries((plugin.override as any).components).forEach(
          ([key, component]) => {
            if (
              !componentOverrides[key] ||
              plugin.priority > componentOverrides[key].priority
            ) {
              componentOverrides[key] = {
                component,
                priority: plugin.priority,
              };
            }
          }
        );
      }
      if (plugin.override.plugins) {
        Object.entries(plugin.override.plugins).forEach(([key, value]) => {
          pluginOverrides[key] = mergePlugins(pluginOverrides[key], value);

          if (value.enabled !== undefined) {
            enabledOverrides[key] = value.enabled;
          }
        });
      }
    }

    // Apply overrides
    overriddenPlugins = overriddenPlugins.map((p) => {
      let updatedPlugin = { ...p };

      // Apply plugin overrides
      if (pluginOverrides[p.key]) {
        updatedPlugin = mergePlugins(updatedPlugin, pluginOverrides[p.key]);
      }
      // Apply component overrides
      // TODO react
      if (
        componentOverrides[p.key] &&
        ((!(p as any).render.node && !(p as any).node.component) ||
          componentOverrides[p.key].priority > p.priority)
      ) {
        (updatedPlugin as any).render.node =
          componentOverrides[p.key].component;
        (updatedPlugin as any).node.component =
          componentOverrides[p.key].component;
      }

      // Apply enabled overrides
      const enabled = enabledOverrides[p.key] ?? updatedPlugin.enabled;

      if (isDefined(enabled)) {
        updatedPlugin.enabled = enabled;
      }

      return updatedPlugin;
    });

    return overriddenPlugins
      .filter((p) => p.enabled !== false)
      .map((plugin) => ({
        ...plugin,
        plugins: applyOverrides(plugin.plugins || []),
      }));
  };

  editor.pluginList = applyOverrides(editor.pluginList as any);
  editor.plugins = Object.fromEntries(
    editor.pluginList.map((plugin) => [plugin.key, plugin])
  );
};
