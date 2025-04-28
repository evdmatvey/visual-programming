import { ReactNode } from 'react';
import styles from './DataSet.module.css';

interface DataSetProps<T> {
  data: T[];
  columns: {
    id: string;
    title: string;
  }[];
  selectedRows: Set<string | number>;
  headerRender?: (value: string) => ReactNode;
  cellRender: (value: T[keyof T], isSelected: boolean, columnId: keyof T, row: T) => ReactNode;
  setSelectedRows: (selected: Set<string | number>) => void;
}

export const DataSet = <T extends { id: number }>({
  data,
  columns,
  selectedRows,
  headerRender,
  cellRender,
  setSelectedRows,
}: DataSetProps<T>) => {
  const tableColumns =
    columns ||
    Object.keys(data[0] || {}).map((key) => ({
      id: key,
      title: key,
    }));

  const handleRowSelect = (hasCtrl: boolean, rowId: string | number) => {
    const prevSelected = selectedRows;
    const newSelection = new Set(prevSelected);

    if (hasCtrl && newSelection.has(rowId)) {
      newSelection.delete(rowId);
    } else if (hasCtrl) {
      newSelection.add(rowId);
    } else {
      newSelection.clear();
      newSelection.add(rowId);
    }

    setSelectedRows(newSelection);
  };

  return (
    <table className={styles.root}>
      <thead>
        <tr>
          <th key="selection-column" style={{ width: '40px' }} />
          {tableColumns.map((column) => (
            <th key={column.id}>{headerRender?.(column.id) || column.title}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, index) => {
          const isSelected = selectedRows.has(row.id ?? index);

          return (
            <tr key={index} className={isSelected ? styles.selectedRow : ''}>
              <td
                className={styles.selectionHandle}
                onClick={(e) => {
                  e.preventDefault();
                  const hasCtrl = e.ctrlKey || e.metaKey;
                  handleRowSelect(hasCtrl, row.id ?? String(index));
                }}
              />
              {tableColumns.map((column) => (
                <td key={column.id}>
                  {cellRender(row[column.id as keyof T], isSelected, column.id as keyof T, row)}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
