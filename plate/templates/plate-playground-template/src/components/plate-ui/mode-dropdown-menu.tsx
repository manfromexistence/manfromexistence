'use client';

import React from 'react';

import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';

import { useEditorRef, usePlateState } from '@udecode/plate/react';
import { Eye, Pen } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  useOpenState,
} from './dropdown-menu';
import { ToolbarButton } from './toolbar';

export function ModeDropdownMenu(props: DropdownMenuProps) {
  const editor = useEditorRef();
  const [readOnly, setReadOnly] = usePlateState('readOnly');
  const openState = useOpenState();

  let value = 'editing';

  if (readOnly) value = 'viewing';

  const item: any = {
    editing: (
      <>
        <Pen />
        <span className="hidden lg:inline">Editing</span>
      </>
    ),
    viewing: (
      <>
        <Eye />
        <span className="hidden lg:inline">Viewing</span>
      </>
    ),
  };

  return (
    <DropdownMenu modal={false} {...openState} {...props}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton
          pressed={openState.open}
          tooltip="Editing mode"
          isDropdown
        >
          {item[value]}
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-[180px]" align="start">
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(newValue) => {
            if (newValue !== 'viewing') {
              setReadOnly(false);
            }
            if (newValue === 'viewing') {
              setReadOnly(true);

              return;
            }
            if (newValue === 'editing') {
              editor.tf.focus();

              return;
            }
          }}
        >
          <DropdownMenuRadioItem value="editing">
            {item.editing}
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem value="viewing">
            {item.viewing}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
