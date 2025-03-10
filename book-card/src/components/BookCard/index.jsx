import { useFetchBookInfo } from '../../hooks/useFetchBookInfo';
import styles from './BookCard.module.css';

export const BookCard = ({ book }) => {
  const { title, isbn, pageCount, authors } = book;
  const info = useFetchBookInfo(isbn);

  const isThumbnailUrlExist = !info || info.totalItems === 0;
  const thumbnailUrlOrNull = isThumbnailUrlExist
    ? null
    : info.items[0].volumeInfo.imageLinks?.thumbnail;

  return (
    <div className={styles.root}>
      <div className={styles.thumbnailPlaceholder}>
        {thumbnailUrlOrNull && <img src={thumbnailUrlOrNull} alt="thumbnail" />}
      </div>
      <h3 className={styles.title}>
        {title} ({pageCount})
      </h3>
      <div className={styles.authors}>{authors.join(', ')}</div>
    </div>
  );
};
