import styles from './DeleteSelected.module.css';

export const DeleteSelected = ({ selected, deleteSelectedHandler }) => {
  const count = selected.size;

  return (
    <button className={styles.root} disabled={count === 0} onClick={deleteSelectedHandler}>
      Удалить ({count})
    </button>
  );
};
