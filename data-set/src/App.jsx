import React from 'react';
import { DataSet } from './components/DataSet';

const users = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' },
  { id: '3', name: 'Bob', email: 'bob@example.com' },
  { id: '4', name: 'Bob', email: 'bob@example.com' },
  { id: '5', name: 'Bob', email: 'bob@example.com' },
];

export const App = () => {
  const headerRender = (columnId) => {
    if (columnId === 'email') {
      return <span>Email Address</span>;
    }
    return columnId;
  };

  const cellRender = (value, columnId, row) => {
    console.log(row);
    if (columnId === 'email') {
      return <a href={`mailto:${value}`}>{value}</a>;
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
          { id: 'email', title: 'Email' },
        ]}
        headerRender={headerRender}
        cellRender={cellRender}
      />
    </div>
  );
};
