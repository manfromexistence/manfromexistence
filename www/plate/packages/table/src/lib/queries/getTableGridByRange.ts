import {
  type ElementEntry,
  type SlateEditor,
  type TElement,
  type TRange,
  NodeApi,
} from '@udecode/plate';

import type { TTableElement } from '../../lib/types';

import { type TableConfig, BaseTablePlugin } from '../../lib/BaseTablePlugin';
import { getTableMergeGridByRange } from '../merge/getTableGridByRange';

export interface GetTableGridByRangeOptions {
  at: TRange;

  /**
   * Format of the output:
   *
   * - Table element
   * - Array of cells
   */
  format?: 'cell' | 'table';
}

/** Get sub table between 2 cell paths. */
export const getTableGridByRange = (
  editor: SlateEditor,
  { at, format = 'table' }: GetTableGridByRangeOptions
): ElementEntry[] => {
  const { api } = editor.getPlugin<TableConfig>({ key: 'table' });
  const { disableMerge } = editor.getOptions(BaseTablePlugin);

  if (!disableMerge) {
    return getTableMergeGridByRange(editor, { at, format });
  }

  const startCellPath = at.anchor.path;
  const endCellPath = at.focus.path;

  const _startRowIndex = startCellPath.at(-2)!;
  const _endRowIndex = endCellPath.at(-2)!;
  const _startColIndex = startCellPath.at(-1)!;
  const _endColIndex = endCellPath.at(-1)!;

  const startRowIndex = Math.min(_startRowIndex, _endRowIndex);
  const endRowIndex = Math.max(_startRowIndex, _endRowIndex);
  const startColIndex = Math.min(_startColIndex, _endColIndex);
  const endColIndex = Math.max(_startColIndex, _endColIndex);

  const tablePath = startCellPath.slice(0, -2);

  const relativeRowIndex = endRowIndex - startRowIndex;
  const relativeColIndex = endColIndex - startColIndex;

  const table: TTableElement = api.create.table({
    children: [],
    colCount: relativeColIndex + 1,
    rowCount: relativeRowIndex + 1,
  });

  let rowIndex = startRowIndex;
  let colIndex = startColIndex;

  const cellEntries: ElementEntry[] = [];

  while (true) {
    const cellPath = tablePath.concat([rowIndex, colIndex]);

    const cell = NodeApi.get<TElement>(editor, cellPath);

    if (!cell) break;

    const rows = table.children[rowIndex - startRowIndex]
      .children as TElement[];

    rows[colIndex - startColIndex] = cell;

    cellEntries.push([cell, cellPath]);

    if (colIndex + 1 <= endColIndex) {
      colIndex += 1;
    } else if (rowIndex + 1 <= endRowIndex) {
      colIndex = startColIndex;
      rowIndex += 1;
    } else {
      break;
    }
  }

  if (format === 'cell') {
    return cellEntries;
  }

  return [[table, tablePath]];
};
