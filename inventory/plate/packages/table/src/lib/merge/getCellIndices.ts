import type { TTableCellElement, TableStoreCellAttributes } from '../types';

export const getCellIndices = (
  cellIndices: TableStoreCellAttributes,
  startCell: TTableCellElement
) => {
  // optional typing needs for tests
  return cellIndices?.get(startCell);
};
