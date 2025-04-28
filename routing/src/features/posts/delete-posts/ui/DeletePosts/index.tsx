import { usePostStore } from '@/entities/post';
import styles from './DeletePosts.module.css';

export const DeletePosts = () => {
  const { selectedPosts, deletePost, setSelectedPosts } = usePostStore();

  const deleteHandler = async () => {
    if (selectedPosts.size === 0) return;

    const itemsToDelete = Array.from(selectedPosts);
    await Promise.all(itemsToDelete.map((id) => deletePost(+id)));
    setSelectedPosts(new Set());
  };

  return (
    <button className={styles.root} disabled={selectedPosts.size === 0} onClick={deleteHandler}>
      Удалить ({selectedPosts.size})
    </button>
  );
};
