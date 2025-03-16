import { BooksSearch } from '../BooksSearch';
import { BooksSort } from '../BooksSort';
import styles from './BooksFilterBar.module.css';

export const BooksFilterBar = () => {
  return (
    <div className={styles.root}>
      <BooksSearch />
      <BooksSort />
    </div>
  );
};
