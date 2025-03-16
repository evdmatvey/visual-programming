import { useFetchBooks } from '../../hooks/useFetchBooks';
import { BooksFilterBar } from '../../components/BooksFilterBar';
import { BooksList } from '../../components/BooksList';
import { BooksContextProvider } from '../../contexts/BooksContext/BookContextProvider';
import styles from './Books.module.css';

export const Books = () => {
  const books = useFetchBooks();

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Книги ({books.length})</h1>
      <BooksContextProvider>
        <BooksFilterBar />
        <BooksList books={books} />
      </BooksContextProvider>
    </div>
  );
};
