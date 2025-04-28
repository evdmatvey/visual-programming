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

  // Все оптимистичные обновления через эту функцию
  const optimisticUpdate = (action) => {
    startTransition(() => {
      setOptimisticData(action);
    });
  };

  const createHandler = async (comment, tempId) => {
    optimisticUpdate({ type: 'create', tempId, payload: comment });

    try {
      const response = await fetch('http://localhost:5241/comments', {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });
      const json = await response.json();

      setData((prev) => [...prev, json]);
      optimisticUpdate({ type: 'confirm', tempId, payload: json });
    } catch {
      optimisticUpdate({ type: 'delete', id: tempId });
    }
  };

  const updateHandler = async (id, updates) => {
    const currentItem = data.find((item) => item.id === id);

    optimisticUpdate({ type: 'update', id, payload: updates });

    try {
      const response = await fetch(`http://localhost:5241/comments/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updates),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });

      const json = await response.json();

      setData((prev) => prev.map((item) => (item.id === id ? { ...json, id: item.id } : item)));

      optimisticUpdate({ type: 'confirm', id, payload: json });
    } catch {
      optimisticUpdate({ type: 'update', id, payload: currentItem });
    }
  };

  const deleteSelectedHandler = async () => {
    if (selected.size === 0) return;

    const itemsToDelete = data.filter((item) => selected.has(item.id));
    optimisticUpdate({ type: 'delete-multiple', ids: Array.from(selected) });

    try {
      await Promise.all(
        Array.from(selected).map((id) =>
          fetch(`http://localhost:5241/comments/${id}`, { method: 'DELETE' }),
        ),
      );

      setData((prev) => prev.filter((item) => !selected.has(item.id)));
      setSelected(new Set());
    } catch (error) {
      console.error('Ошибка при удалении:', error);
      optimisticUpdate({ type: 'restore-multiple', items: itemsToDelete });
    }
  };

  useEffect(() => {
    fetch('http://localhost:5241/comments')
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
