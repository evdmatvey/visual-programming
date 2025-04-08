import React, { useState, useEffect, useOptimistic, startTransition } from 'react';
import { DataSet } from './components/DataSet';
import { DataCell } from './components/DataCell';
import { CreateForm } from './components/CreateForm';
import { DeleteSelected } from './components/DeleteSelected';

export const App = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [optimisticData, setOptimisticData] = useOptimistic(data, (state, action) => {
    switch (action.type) {
      case 'create':
        return [...state, { id: action.tempId, ...action.payload }];
      case 'update':
        return state.map((item) => (item.id === action.id ? { ...item, ...action.payload } : item));
      case 'confirm':
        return state.map((item) => (item.id === action.tempId ? action.payload : item));
      case 'rollback':
        return data;
      case 'delete-multiple':
        return state.filter((item) => !action.ids.includes(item.id));
      case 'restore-multiple':
        return [...state, ...action.items].sort((a, b) => a.id - b.id);
      default:
        return state;
    }
  });

  const optimisticUpdate = (action) => {
    startTransition(() => {
      setOptimisticData(action);
    });
  };

  const createHandler = async (comment, tempId) => {
    optimisticUpdate({
      type: 'create',
      tempId,
      payload: comment,
    });

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/comments', {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const json = await response.json();

      setData((prev) => [...prev, json]);
      optimisticUpdate({
        type: 'confirm',
        tempId,
        payload: json,
      });
    } catch {
      optimisticUpdate({
        type: 'delete',
        id: tempId,
      });
    }
  };

  const updateHandler = async (id, updates) => {
    startTransition(() => {
      setOptimisticData({
        type: 'update',
        id,
        payload: updates,
      });
    });

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      const json = await response.json();

      setData((prev) => prev.map((item) => (item.id === id ? json : item)));
      optimisticUpdate({
        type: 'confirm',
        id,
        payload: json,
      });
    } catch {
      startTransition(() => {
        setOptimisticData({
          type: 'rollback',
        });
      });
    }
  };

  const deleteSelectedHandler = async () => {
    if (selected.size === 0) return;

    const itemsToDelete = data.filter((item) => selected.has(item.id));
    startTransition(() => {
      setOptimisticData({
        type: 'delete-multiple',
        ids: Array.from(selected),
      });
    });

    try {
      await Promise.all(
        Array.from(selected).map((id) =>
          fetch(`https://jsonplaceholder.typicode.com/comments/${id}`, {
            method: 'DELETE',
          }),
        ),
      );

      setData((prev) =>
        prev.filter((item) => !itemsToDelete.map((item) => item.id).includes(item.id)),
      );
      setSelected(new Set());
    } catch (error) {
      console.error('Ошибка при удалении:', error);

      startTransition(() => {
        setOptimisticData({
          type: 'restore-multiple',
          items: itemsToDelete,
        });
      });
    }
  };

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments?_limit=10')
      .then((res) => res.json())
      .then(setData);
  }, []);

  const cellRender = (value, isSelected, columnId, row) => {
    return (
      <DataCell
        value={value}
        isSelected={isSelected}
        isSmall={columnId === 'id'}
        updateHandler={updateHandler}
        row={row}
        columnId={columnId}
      />
    );
  };

  return (
    <div className="wrapper">
      <CreateForm createHandler={createHandler} />
      <DeleteSelected selected={selected} deleteSelectedHandler={deleteSelectedHandler} />
      <DataSet
        data={optimisticData.sort((a, b) => a.id - b.id)}
        columns={[
          { id: 'id', title: 'ID' },
          { id: 'name', title: 'Имя' },
          { id: 'email', title: 'Почта' },
          { id: 'body', title: 'Сообщение' },
        ]}
        cellRender={cellRender}
        selectedRows={selected}
        setSelectedRows={setSelected}
      />
    </div>
  );
};
