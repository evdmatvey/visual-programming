import { useCommentsList } from '../../hooks/useCommentsList';
import { CommentCard } from '../CommentCard';
import styles from './CommentsList.module.css';

export const CommentsList = ({ comments }) => {
  const { filteredComments } = useCommentsList(comments);

  return (
    <>
      <div className={styles.comments}>
        {filteredComments.length &&
          filteredComments.map((comment) => <CommentCard key={comment.id} comment={comment} />)}
      </div>
    </>
  );
};
