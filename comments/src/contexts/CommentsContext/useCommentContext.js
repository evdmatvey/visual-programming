import { useContext } from 'react';
import { CommentsContext } from './context';

export const useCommentsContext = () => {
  const context = useContext(CommentsContext);

  if (!context) {
    throw new Error('Отсутствует BookContext!');
  }

  return context;
};
