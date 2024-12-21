import {
  type TElement,
  getBlockAbove,
  isCollapsed,
} from '@udecode/plate-common';
import {
  focusEditor,
  useEditorRef,
  useEditorSelector,
} from '@udecode/plate-common/react';

import { BaseLineHeightPlugin, setLineHeight } from '../../index';

export const useLineHeightDropdownMenuState = () => {
  const editor = useEditorRef();
  const { defaultNodeValue, validNodeValues: values = [] } =
    editor.getInjectProps(BaseLineHeightPlugin);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const value: string | undefined = useEditorSelector((editor) => {
    if (isCollapsed(editor.selection)) {
      const entry = getBlockAbove<TElement>(editor);

      if (entry) {
        return (
          values.find((item) => item === entry[0][BaseLineHeightPlugin.key]) ??
          defaultNodeValue
        );
      }
    }
  }, []);

  return {
    value,
    values,
  };
};

export const useLineHeightDropdownMenu = ({
  value,
}: ReturnType<typeof useLineHeightDropdownMenuState>) => {
  const editor = useEditorRef();

  return {
    radioGroupProps: {
      value,
      onValueChange: (newValue: string) => {
        setLineHeight(editor, {
          value: Number(newValue),
        });
        focusEditor(editor);
      },
    },
  };
};
