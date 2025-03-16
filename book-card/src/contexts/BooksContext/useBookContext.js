import { useContext } from 'react';
import { BooksContext } from './context';

export const useBooksContext = () => {
  const context = useContext(BooksContext);

  if (!context) {
    throw new Error('Отсутствует BookContext!');
  }

  return context;
};
