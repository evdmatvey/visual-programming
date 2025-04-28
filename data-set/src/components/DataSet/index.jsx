import React from 'react';
import styles from './DataSet.module.css';

export const DataSet = ({
  data,
  columns,
  headerRender,
  cellRender,
  selectedRows,
  setSelectedRows,
}) => {
  const tableColumns =
    columns ||
    Object.keys(data[0] || {}).map((key) => ({
      id: key,
      title: key,
    }));

  const getRowId = (row) => row.id || Math.random().toString(36).substr(2, 9);

  const handleRowSelect = (event, rowId) => {
    event.preventDefault();
    setSelectedRows((prev) => {
      const newSelection = new Set(prev);
      const hasCtrl = event.ctrlKey || event.metaKey;

      if (hasCtrl && newSelection.has(rowId)) {
        newSelection.delete(rowId);
      } else if (hasCtrl) {
        newSelection.add(rowId);
      } else {
        newSelection.clear();
        newSelection.add(rowId);
      }

      return newSelection;
    });
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
        {data.map((row) => {
          const rowId = getRowId(row);
          const isSelected = selectedRows.has(rowId);

          return (
            <tr key={rowId} className={isSelected ? styles.selectedRow : ''}>
              <td className={styles.selectionHandle} onClick={(e) => handleRowSelect(e, rowId)} />

              {tableColumns.map((column) => (
                <td key={`${rowId}-${column.id}`}>
                  {cellRender?.(row[column.id], isSelected, column.id, row) || row[column.id]}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
