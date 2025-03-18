import { CommentsFilterBar } from '../../components/CommentsFilterBar';
import { CommentsList } from '../../components/CommentsList';
import { CommentsContextProvider } from '../../contexts/CommentsContext/BookContextProvider';
import { useFetchComments } from '../../hooks/useFetchComments';
import styles from './Comments.module.css';

export const Comments = () => {
  const comments = useFetchComments();

  return (
    <CommentsContextProvider>
      <div className={styles.root}>
        <CommentsFilterBar />
        <CommentsList comments={comments} />
      </div>
    </CommentsContextProvider>
  );
};
