import { useTodoStore } from '@/entities/todo';
import styles from './DeleteTodos.module.css';

export const DeleteTodos = () => {
  const { selectedTodos, deleteTodo, setSelectedTodos } = useTodoStore();

  const deleteHandler = async () => {
    if (selectedTodos.size === 0) return;

    const itemsToDelete = Array.from(selectedTodos);
    await Promise.all(itemsToDelete.map((id) => deleteTodo(+id)));
    setSelectedTodos(new Set());
  };

  return (
    <button className={styles.root} disabled={selectedTodos.size === 0} onClick={deleteHandler}>
      Удалить ({selectedTodos.size})
    </button>
  );
};
