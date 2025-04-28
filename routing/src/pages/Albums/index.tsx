import { useEffect } from 'react';
import { CreateAlbumForm } from '@/features/albums/create-album';
import { useAlbumStore, AlbumCell } from '@/entities/album';
import { DataSet } from '@/shared/ui/DataSet';
import styles from './Albums.module.css';
import { DeleteAlbums } from '@/features/albums/delete-albums';

export const Albums = () => {
  const { albums, loadAlbums, selectedAlbums, setSelectedAlbums } = useAlbumStore();

  useEffect(() => {
    loadAlbums();
  }, []);

  return (
    <div className={styles.root}>
      <CreateAlbumForm />
      <DeleteAlbums />
      <DataSet
        data={albums.sort((a, b) => a.id - b.id)}
        columns={[
          { id: 'id', title: 'ID' },
          { id: 'userId', title: 'user ID' },
          { id: 'title', title: 'Название' },
        ]}
        cellRender={(value, isSelected, columnId, row) => {
          return (
            <AlbumCell
              value={value}
              isSelected={isSelected}
              isSmall={columnId === 'id'}
              row={row}
              columnId={columnId}
            />
          );
        }}
        selectedRows={selectedAlbums}
        setSelectedRows={setSelectedAlbums}
      />
    </div>
  );
};
