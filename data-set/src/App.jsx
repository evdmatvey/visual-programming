import React from 'react';
import { DataSet } from './components/DataSet';

const users = [
  { id: '1', name: 'Alice', debit: 1 },
  { id: '2', name: 'Bob', debit: 142 },
  { id: '3', name: 'Bob', debit: 12 },
  { id: '4', name: 'Bob', debit: 124 },
  { id: '5', name: 'Bob', debit: 23 },
];

export const App = () => {
  const headerRender = (columnId) => {
    if (columnId === 'debit') {
      return <span>Balance</span>;
    }
    return columnId;
  };

  const cellRender = (value, columnId, row) => {
    console.log(row);
    if (columnId === 'debit') {
      return <span>{value.toFixed(2)}</span>;
    }
    return value;
  };

  return (
    <div>
      <DataSet
        data={users}
        columns={[
          { id: 'id', title: 'ID' },
          { id: 'name', title: 'Name' },
          { id: 'debit', title: 'debit' },
        ]}
        headerRender={headerRender}
        cellRender={cellRender}
      />
    </div>
  );
};
