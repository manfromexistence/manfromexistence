'use client';

import { useEditorRef, withRef } from '@udecode/plate-common/react';
import { insertInlineEquation } from '@udecode/plate-math';
import { RadicalIcon } from 'lucide-react';

import { ToolbarButton } from './toolbar';

export const InlineEquationToolbarButton = withRef<typeof ToolbarButton>(
  (props, ref) => {
    const editor = useEditorRef();

    return (
      <ToolbarButton
        ref={ref}
        tooltip="Mark as equation"
        {...props}
        onClick={() => {
          insertInlineEquation(editor);
        }}
      >
        <RadicalIcon />
      </ToolbarButton>
    );
  }
);
