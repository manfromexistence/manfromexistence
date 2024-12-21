import {
  type SlateEditor,
  findNode,
  getNodeEntry,
} from '@udecode/plate-common';
import { Path } from 'slate';

import type { TTableCellElement } from '../types';

import { getCellTypes } from '../utils/index';

// Get cell to the top of the current cell
export const getTopTableCell = (
  editor: SlateEditor,
  {
    at: cellPath,
  }: {
    at?: Path;
  } = {}
) => {
  if (!cellPath) {
    cellPath = findNode<TTableCellElement>(editor, {
      match: { type: getCellTypes(editor) },
    })?.[1];

    if (!cellPath) return;
  }

  const cellIndex = cellPath.at(-1)!;
  const rowIndex = cellPath.at(-2)!;

  // If the current cell is in the first row, there is no cell above it
  if (rowIndex === 0) return;

  const cellAbovePath = [
    ...Path.parent(Path.parent(cellPath)),
    rowIndex - 1,
    cellIndex,
  ];

  return getNodeEntry<TTableCellElement>(editor, cellAbovePath);
};
