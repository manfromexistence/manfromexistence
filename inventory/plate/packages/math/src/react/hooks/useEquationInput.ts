import React, { useEffect, useRef } from 'react';

import { isHotkey } from '@udecode/plate-common';
import {
  selectSiblingNodePoint,
  setNode,
  useEditorRef,
  useElement,
} from '@udecode/plate-common/react';

import type { TEquationElement } from '../../lib';

export const useEquationInput = ({
  isInline,
  open,
  onClose,
}: {
  isInline?: boolean;
  open?: boolean;
  onClose?: () => void;
}) => {
  const editor = useEditorRef();
  const element = useElement<TEquationElement>();
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const [expressionInput, setExpressionInput] = React.useState<string>(
    element.texExpression
  );

  const initialExpressionRef = useRef<string>(element.texExpression);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();

          if (isInline) {
            initialExpressionRef.current = element.texExpression;
          }
        }
      }, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    setNode<TEquationElement>(editor, element, {
      texExpression: expressionInput || '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expressionInput]);

  const onSubmit = () => {
    onClose?.();
  };

  const onDismiss = () => {
    if (isInline) {
      setNode(editor, element, {
        texExpression: initialExpressionRef.current,
      });
    }

    onClose?.();
  };

  return {
    props: {
      value: expressionInput,
      onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setExpressionInput(e.target.value);
      },
      onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (isHotkey('enter')(e)) {
          e.preventDefault();
          onSubmit();
        } else if (isHotkey('escape')(e)) {
          e.preventDefault();
          onDismiss();
        } else if (isHotkey('meta+z')(e)) {
          e.preventDefault();
          editor.undo();
        } else if (isHotkey('meta+y')(e) || isHotkey('meta+shift+z')(e)) {
          e.preventDefault();
          editor.redo();
        }
        if (isInline) {
          const { selectionEnd, selectionStart, value } =
            e.target as HTMLInputElement;

          // at the left edge
          if (
            selectionStart === 0 &&
            selectionEnd === 0 &&
            isHotkey('ArrowLeft')(e)
          ) {
            selectSiblingNodePoint(editor, {
              node: element,
              reverse: true,
            });
          }
          // at the right edge
          if (
            selectionEnd === value.length &&
            selectionStart === value.length &&
            isHotkey('ArrowRight')(e)
          ) {
            selectSiblingNodePoint(editor, { node: element });
          }
        }
      },
    },
    ref: inputRef,
    onDismiss,
    onSubmit,
  };
};
