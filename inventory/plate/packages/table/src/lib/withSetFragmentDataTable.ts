import {
  type ExtendEditor,
  type TElement,
  findNode,
  findNodePath,
  getEndPoint,
  getStartPoint,
  select,
  withoutNormalizing,
} from '@udecode/plate-common';

import {
  type TTableCellElement,
  type TTableElement,
  type TableConfig,
  getColSpan,
  getRowSpan,
} from '.';
import { BaseTableCellHeaderPlugin, BaseTablePlugin } from './BaseTablePlugin';
import { getTableGridAbove } from './queries';

export const withSetFragmentDataTable: ExtendEditor<TableConfig> = ({
  editor,
  plugin,
}) => {
  const { setFragmentData } = editor;

  editor.setFragmentData = (
    data: DataTransfer,
    originEvent?: 'copy' | 'cut' | 'drag' | undefined
  ) => {
    const tableEntry = getTableGridAbove(editor, {
      format: 'table',
    })?.[0];
    const selectedCellEntries = getTableGridAbove(editor, {
      format: 'cell',
    });

    const initialSelection = editor.selection;

    if (!tableEntry || !initialSelection) {
      setFragmentData(data, originEvent);

      return;
    }

    const [tableNode, tablePath] = tableEntry;
    const tableRows = tableNode.children as TElement[];
    tableNode.children = tableNode.children.filter(
      (v) => (v as TTableCellElement).children.length > 0
    );

    let textCsv = '';
    let textTsv = '';

    const divElement = document.createElement('div');
    const tableElement = document.createElement('table');

    /**
     * Cover single cell copy | cut operation. In this case, copy cell content
     * instead of table structure.
     */
    if (
      tableEntry &&
      initialSelection &&
      selectedCellEntries.length === 1 &&
      (originEvent === 'copy' || originEvent === 'cut')
    ) {
      setFragmentData(data);

      return;
    }

    withoutNormalizing(editor, () => {
      tableRows.forEach((row) => {
        const rowCells = row.children as TTableCellElement[];

        const cellStrings: string[] = [];
        const rowElement =
          row.type === editor.getType(BaseTableCellHeaderPlugin)
            ? document.createElement('th')
            : document.createElement('tr');

        rowCells.forEach((cell) => {
          // need to clean data before every iteration
          data.clearData();

          const cellPath = findNodePath(editor, cell)!;

          // select cell by cell
          select(editor, {
            anchor: getStartPoint(editor, cellPath),
            focus: getEndPoint(editor, cellPath),
          });

          // set data from selection
          setFragmentData(data);

          // get plain text
          cellStrings.push(data.getData('text/plain'));

          const cellElement = document.createElement('td');

          const colSpan = getColSpan(cell);
          cellElement.colSpan = colSpan;
          const rowSpan = getRowSpan(cell);
          cellElement.rowSpan = rowSpan;

          cellElement.innerHTML = data.getData('text/html');
          rowElement.append(cellElement);
        });

        tableElement.append(rowElement);

        textCsv += `${cellStrings.join(',')}\n`;
        textTsv += `${cellStrings.join('\t')}\n`;
      });

      const _tableEntry = findNode<TTableElement>(editor, {
        at: tablePath,
        match: { type: BaseTablePlugin.key },
      });

      if (_tableEntry != null && _tableEntry.length > 0) {
        const realTable = _tableEntry[0];

        if (realTable.attributes != null) {
          Object.entries(realTable.attributes).forEach(([key, value]) => {
            if (
              value != null &&
              plugin.node.dangerouslyAllowAttributes?.includes(key)
            ) {
              tableElement.setAttribute(key, String(value));
            }
          });
        }
      }

      // select back original cells
      select(editor, initialSelection!);

      divElement.append(tableElement);
    });

    data.setData('text/csv', textCsv);
    data.setData('text/tsv', textTsv);
    data.setData('text/plain', textTsv);
    data.setData('text/html', divElement.innerHTML);

    // set slate fragment
    const selectedFragmentStr = JSON.stringify(tableNode);
    const encodedFragment = window.btoa(
      encodeURIComponent(selectedFragmentStr)
    );
    data.setData('application/x-slate-fragment', encodedFragment);
  };

  return editor;
};
