import type { TElement } from '@udecode/plate-common';

export interface TColumnElement extends TElement {
  type: 'column';
  width: string;
  id?: string;
}

export interface TColumnGroupElement extends TElement {
  children: TColumnElement[];
  type: 'column_group';
  id?: string;
}
