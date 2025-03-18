import { CommentsSearch } from '../CommentsSearch';
import { CommentsSort } from '../CommentsSort';
import styles from './BooksFilterBar.module.css';

export const CommentsFilterBar = () => {
  return (
    <div className={styles.root}>
      <CommentsSearch />
      <CommentsSort />
    </div>
  );
};
