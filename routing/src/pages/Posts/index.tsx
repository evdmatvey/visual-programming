import { useEffect } from 'react';
import { CreatePostForm } from '@/features/posts/create-posts';
import { usePostStore, PostCell } from '@/entities/post';
import { DataSet } from '@/shared/ui/DataSet';
import styles from './Posts.module.css';
import { DeletePosts } from '@/features/posts/delete-posts';

export const Posts = () => {
  const { posts, loadPosts, selectedPosts, setSelectedPosts } = usePostStore();

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className={styles.root}>
      <CreatePostForm />
      <DeletePosts />
      <DataSet
        data={posts.sort((a, b) => a.id - b.id)}
        columns={[
          { id: 'id', title: 'ID' },
          { id: 'userId', title: 'user ID' },
          { id: 'title', title: 'Название' },
          { id: 'body', title: 'Текст' },
        ]}
        cellRender={(value, isSelected, columnId, row) => {
          return (
            <PostCell
              value={value}
              isSelected={isSelected}
              isSmall={columnId === 'id'}
              row={row}
              columnId={columnId}
            />
          );
        }}
        selectedRows={selectedPosts}
        setSelectedRows={setSelectedPosts}
      />
    </div>
  );
};
