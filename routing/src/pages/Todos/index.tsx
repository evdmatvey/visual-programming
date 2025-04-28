import { useEffect } from 'react';
import { CreateTodoForm } from '@/features/todos/create-todo';
import { useTodoStore, TodoCell } from '@/entities/todo';
import { DataSet } from '@/shared/ui/DataSet';
import styles from './Todos.module.css';
import { DeleteTodos } from '@/features/todos/delete-todos';

export const Todos = () => {
  const { todos, loadTodos, selectedTodos, setSelectedTodos } = useTodoStore();

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div className={styles.root}>
      <CreateTodoForm />
      <DeleteTodos />
      <DataSet
        data={todos.sort((a, b) => a.id - b.id)}
        columns={[
          { id: 'id', title: 'ID' },
          { id: 'userId', title: 'user ID' },
          { id: 'title', title: 'Название' },
          { id: 'completed', title: 'Выполнено' },
        ]}
        cellRender={(value, isSelected, columnId, row) => {
          return (
            <TodoCell
              value={value}
              isSelected={isSelected}
              isSmall={columnId === 'id'}
              row={row}
              columnId={columnId}
            />
          );
        }}
        selectedRows={selectedTodos}
        setSelectedRows={setSelectedTodos}
      />
    </div>
  );
};
