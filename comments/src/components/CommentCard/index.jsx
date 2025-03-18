import styles from './BookCard.module.css';

export const CommentCard = ({ comment }) => {
  const { postId, id, name, email, body } = comment;

  return (
    <div className={styles.root}>
      <div className={styles.author}>
        <div className={styles.name}>{name}</div>
        <div className={styles.email}>{email}</div>
      </div>
      <div className={styles.body}>{body}</div>
      <div className={styles.info}>
        {id}: ${postId}
      </div>
    </div>
  );
};
