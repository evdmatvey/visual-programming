import { useMemo } from 'react';
import { useBooksContext } from '../contexts/BooksContext/useBookContext';

export const useBooksList = (books) => {
  const { searchQuery, sortBy, sortType } = useBooksContext();

  const compareWithSearchQuery = (str, searchQuery) => {
    return str.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const compareStrings = (a, b) => {
    return a.localeCompare(b);
  };

  const filteredBooks = useMemo(
    () =>
      books
        .filter((book) => {
          const isBookTitleMatched = compareWithSearchQuery(book.title, searchQuery);
          const isBookAuthorsMatched = book.authors.some((author) =>
            compareWithSearchQuery(author, searchQuery),
          );

          return isBookTitleMatched || isBookAuthorsMatched;
        })
        .sort((a, b) => {
          const isAscending = sortType === 'asc';
          const value1 = sortBy === 'title' ? a.title : a.authors[0];
          const value2 = sortBy === 'title' ? b.title : b.authors[0];

          return isAscending ? compareStrings(value1, value2) : compareStrings(value2, value1);
        }),
    [searchQuery, sortBy, sortType, books],
  );

  const isBooksExist = filteredBooks && filteredBooks.length > 0;
  const isBooksLoading = !isBooksExist && !searchQuery;

  return { filteredBooks, isBooksExist, isBooksLoading, searchQuery };
};
