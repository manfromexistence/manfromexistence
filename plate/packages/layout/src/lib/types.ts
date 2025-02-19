import type { TElement } from '@udecode/plate';

export interface TColumnElement extends TElement {
  type: 'column';
  width: string;
  id?: string;
}

export interface TColumnGroupElement extends TElement {
  children: TColumnElement[];
  type: 'column_group';
  id?: string;
  layout?: number[];
}
