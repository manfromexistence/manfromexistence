'use client';

import React from 'react';

import type { PlateElementProps } from '@udecode/plate-common/react';

import { PlateElement as PlateElementPrimitive } from '@udecode/plate-common/react';

import { BlockSelection } from './block-selection';

export const PlateElement = React.forwardRef<HTMLDivElement, PlateElementProps>(
  ({ children, ...props }: PlateElementProps, ref) => {
    return (
      <PlateElementPrimitive ref={ref} {...props}>
        {children}

        {props.className?.includes('slate-selectable') && <BlockSelection />}
      </PlateElementPrimitive>
    );
  }
);
