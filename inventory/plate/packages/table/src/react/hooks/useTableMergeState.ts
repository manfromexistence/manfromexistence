/* eslint-disable react-hooks/rules-of-hooks */
import { isSelectionExpanded } from '@udecode/plate-common';
import { useEditorRef, useEditorSelector } from '@udecode/plate-common/react';
import { useReadOnly, useSelected } from 'slate-react';

import {
  type TTableCellElement,
  getColSpan,
  getRowSpan,
  getTableGridAbove,
  isTableRectangular,
} from '../../lib';
import { TablePlugin } from '../TablePlugin';
import { useTableStore } from '../stores';

export const useTableMergeState = () => {
  const editor = useEditorRef();

  const { enableMerging } = editor.getOptions(TablePlugin);

  if (!enableMerging) return { canMerge: false, canUnmerge: false };

  const readOnly = useReadOnly();
  const selected = useSelected();
  const selectionExpanded = useEditorSelector(isSelectionExpanded, []);

  const collapsed = !readOnly && selected && !selectionExpanded;
  const selectedTables = useTableStore().get.selectedTable();
  const selectedTable = selectedTables?.[0];

  const selectedCellEntries = useEditorSelector(
    (editor) =>
      getTableGridAbove(editor, {
        format: 'cell',
      }),
    []
  );

  if (!selectedCellEntries) return { canMerge: false, canUnmerge: false };

  const canMerge =
    !readOnly &&
    selected &&
    selectionExpanded &&
    selectedCellEntries.length > 1 &&
    isTableRectangular(selectedTable);

  const canUnmerge =
    collapsed &&
    selectedCellEntries.length === 1 &&
    (getColSpan(selectedCellEntries[0][0] as TTableCellElement) > 1 ||
      getRowSpan(selectedCellEntries[0][0] as TTableCellElement) > 1);

  return { canMerge, canUnmerge };
};
