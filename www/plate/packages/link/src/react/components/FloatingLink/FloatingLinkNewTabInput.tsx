import React from 'react';

import {
  createPrimitiveComponent,
  useEditorPlugin,
  usePluginOption,
} from '@udecode/plate/react';

import { LinkPlugin } from '../../LinkPlugin';

export const useFloatingLinkNewTabInputState = () => {
  const { getOptions } = useEditorPlugin(LinkPlugin);
  const updated = usePluginOption(LinkPlugin, 'updated');
  const ref = React.useRef<HTMLInputElement>(null);
  const [checked, setChecked] = React.useState<boolean>(getOptions().newTab);

  React.useEffect(() => {
    if (ref.current && updated) {
      setTimeout(() => {
        ref.current?.focus();
      }, 0);
    }
  }, [updated]);

  return {
    checked,
    ref,
    setChecked,
  };
};

export const useFloatingLinkNewTabInput = ({
  checked,
  ref,
  setChecked,
}: ReturnType<typeof useFloatingLinkNewTabInputState>) => {
  const { setOption } = useEditorPlugin(LinkPlugin);

  const onChange: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback(
      (e) => {
        setChecked(e.target.checked);
        setOption('newTab', e.target.checked);
      },
      [setOption, setChecked]
    );

  return {
    props: {
      checked,
      type: 'checkbox',
      onChange,
    },
    ref,
  };
};

export const FloatingLinkNewTabInput = createPrimitiveComponent('input')({
  propsHook: useFloatingLinkNewTabInput,
  stateHook: useFloatingLinkNewTabInputState,
});
