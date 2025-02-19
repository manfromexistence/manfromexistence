import type { ChatRequestOptions } from 'ai';

import { isSelecting } from '@udecode/plate-selection';
import { type PlateEditor, getEditorPlugin } from '@udecode/plate/react';

import type { AIChatPluginConfig } from '../AIChatPlugin';

import { AIPlugin } from '../../ai/AIPlugin';
import { type EditorPrompt, getEditorPrompt } from './getEditorPrompt';

export const submitAIChat = (
  editor: PlateEditor,
  {
    mode,
    options,
    prompt,
    system,
  }: {
    mode?: 'chat' | 'insert';
    options?: ChatRequestOptions;
    prompt?: EditorPrompt;
    system?: EditorPrompt;
  } = {}
) => {
  const { getOptions, setOption } = getEditorPlugin<AIChatPluginConfig>(
    editor,
    {
      key: 'aiChat',
    }
  );

  const { chat, promptTemplate, systemTemplate } = getOptions();

  if (!prompt && chat.input?.length === 0) {
    return;
  }
  if (!prompt) {
    prompt = chat.input;
  }
  if (!mode) {
    mode = isSelecting(editor) ? 'chat' : 'insert';
  }
  if (mode === 'insert') {
    editor.getTransforms(AIPlugin).ai.undo();
  }

  setOption('mode', mode);

  chat.setInput?.('');

  void chat.append?.(
    {
      content:
        getEditorPrompt(editor, {
          prompt,
          promptTemplate,
        }) ?? '',
      role: 'user',
    },
    {
      body: {
        system: getEditorPrompt(editor, {
          prompt: system,
          promptTemplate: systemTemplate,
        }),
      },
      ...options,
    }
  );
};
