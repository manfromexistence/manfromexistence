import * as React from 'react';
import { AnimateType } from '../../utils';
import { BoxProps } from '../Box/index';

export interface AccordionProps {
  activeIndex?: number | number[];
  animate?: AnimateType;
  level?: number;
  onActive?: (activeIndexes: number[]) => void;
  multiple?: boolean;
  messages?: { tabContents?: string };
}

export interface AccordionExtendedProps
  extends AccordionProps,
    BoxProps,
    Omit<JSX.IntrinsicElements['div'], 'onClick'> {}

declare const Accordion: React.FC<AccordionExtendedProps>;

export { Accordion };
