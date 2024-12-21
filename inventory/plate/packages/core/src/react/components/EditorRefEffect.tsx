import React from 'react';

import type { AnyEditorPlatePlugin } from '../plugin/PlatePlugin';

import { getEditorPlugin } from '../plugin';
import { useEditorRef, usePlateActions, usePlateSelectors } from '../stores';

export function EditorRefPluginEffect({
  id,
  plugin,
}: {
  plugin: AnyEditorPlatePlugin;
  id?: string;
}) {
  const editor = useEditorRef(id);

  plugin.useHooks?.(getEditorPlugin(editor, plugin) as any);

  return null;
}

export function EditorRefEffect({ id }: { id?: string }) {
  const editor = usePlateSelectors(id).editor();
  const setIsMounted = usePlateActions(id).isMounted();

  React.useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, [setIsMounted]);

  return (
    <>
      {editor.pluginList.map((plugin) => (
        <EditorRefPluginEffect id={id} key={plugin.key} plugin={plugin} />
      ))}
    </>
  );
}
