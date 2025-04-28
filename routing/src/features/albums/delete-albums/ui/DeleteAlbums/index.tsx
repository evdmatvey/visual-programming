import { useAlbumStore } from '@/entities/album';
import styles from './DeleteAlbums.module.css';

export const DeleteAlbums = () => {
  const { selectedAlbums, deleteAlbum, setSelectedAlbums } = useAlbumStore();

  const deleteHandler = async () => {
    if (selectedAlbums.size === 0) return;

    const itemsToDelete = Array.from(selectedAlbums);
    await Promise.all(itemsToDelete.map((id) => deleteAlbum(+id)));
    setSelectedAlbums(new Set());
  };

  return (
    <button className={styles.root} disabled={selectedAlbums.size === 0} onClick={deleteHandler}>
      Удалить ({selectedAlbums.size})
    </button>
  );
};
