import React, { useState, useCallback } from 'react';
import styles from './DataSet.module.css';

export const DataSet = ({ data, columns, headerRender, cellRender }) => {
  const [selectedRows, setSelectedRows] = useState(new Set());

  const tableColumns =
    columns ||
    Object.keys(data[0] || {}).map((key) => ({
      id: key,
      title: key,
    }));

  const handleRowSelect = useCallback((event, rowId) => {
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
  }, []);

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
          const isSelected = selectedRows.has(String(index));

          return (
            <tr key={index} className={isSelected ? styles.selectedRow : ''}>
              <td
                className={styles.selectionHandle}
                onClick={(e) => handleRowSelect(e, String(index))}
              />
              {tableColumns.map((column) => (
                <td key={column.id}>
                  {cellRender?.(row[column.id], column.id, row) || row[column.id]}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
