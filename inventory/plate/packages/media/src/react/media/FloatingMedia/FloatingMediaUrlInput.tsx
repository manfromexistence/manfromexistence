import React from 'react';

import type { WithRequiredKey } from '@udecode/plate-common';

import {
  createPrimitiveComponent,
  focusEditor,
  useEditorRef,
  useElement,
  useHotkeys,
} from '@udecode/plate-common/react';

import type { TMediaElement } from '../../../lib/media/types';

import {
  floatingMediaActions,
  floatingMediaSelectors,
} from './FloatingMediaStore';
import { submitFloatingMedia } from './submitFloatingMedia';

export const useFloatingMediaUrlInputState = ({
  plugin,
}: {
  plugin: WithRequiredKey;
}) => {
  const editor = useEditorRef();
  const element = useElement<TMediaElement>();

  useHotkeys(
    'enter',
    (e) => {
      if (submitFloatingMedia(editor, { element, plugin })) {
        e.preventDefault();
      }
    },
    {
      enableOnFormTags: ['INPUT'],
    },
    []
  );

  useHotkeys(
    'escape',
    () => {
      if (floatingMediaSelectors.isEditing()) {
        floatingMediaActions.reset();
        focusEditor(editor, editor.selection!);
      }
    },
    {
      enableOnContentEditable: true,
      enableOnFormTags: ['INPUT'],
    },
    []
  );

  return {
    defaultValue: floatingMediaSelectors.url(),
  };
};

export const useFloatingMediaUrlInput = ({
  defaultValue,
}: ReturnType<typeof useFloatingMediaUrlInputState>) => {
  const onChange: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback((e) => {
      floatingMediaActions.url(e.target.value);
    }, []);

  return {
    props: {
      autoFocus: true,
      defaultValue,
      onChange,
    },
  };
};

export const FloatingMediaUrlInput = createPrimitiveComponent('input')({
  propsHook: useFloatingMediaUrlInput,
  stateHook: useFloatingMediaUrlInputState,
});
