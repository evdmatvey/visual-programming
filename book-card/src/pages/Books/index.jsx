import { useFetchBooks } from '../../hooks/useFetchBooks';
import { BookCard } from '../../components/BookCard';
import styles from './Books.module.css';

export const Books = () => {
  const books = useFetchBooks();

  return (
    <>
      <h1 className={styles.title}>Книги ({books.length})</h1>
      <div className={styles.books}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </>
  );
};
