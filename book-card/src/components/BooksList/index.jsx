import { BookCard } from '../BookCard';
import { useBooksList } from '../../hooks/useBooksList';
import styles from './BooksList.module.css';

export const BooksList = ({ books }) => {
  const { filteredBooks, isBooksExist, isBooksLoading, searchQuery } = useBooksList(books);

  return (
    <>
      <div className={styles.books}>
        {isBooksExist && filteredBooks.map((book) => <BookCard key={book.id} book={book} />)}
      </div>
      <div className={styles.info}>
        {!isBooksExist && !isBooksLoading && (
          <div className={styles.notFound}>Книнги по запросу "{searchQuery}" не найдены!</div>
        )}
        {isBooksLoading && <div className={styles.loader}></div>}
      </div>
    </>
  );
};
