import { useMemo } from 'react';
import { useCommentsContext } from '../contexts/CommentsContext/useCommentContext';

export const useCommentsList = (comments) => {
  const { searchQuery, sortBy, sortType } = useCommentsContext();

  const compareWithSearchQuery = (str, searchQuery) => {
    return str.toLowerCase().includes(searchQuery.toLowerCase());
  };

  const compareStrings = (a, b) => {
    return a.localeCompare(b);
  };

  const filteredComments = useMemo(
    () =>
      comments
        .filter((comment) => compareWithSearchQuery(comment.body, searchQuery))
        .sort((a, b) => {
          const isAscending = sortType === 'asc';
          const value1 = sortBy === 'name' ? a.name : a.postId.toString();
          const value2 = sortBy === 'name' ? b.name : b.postId.toString();

          return isAscending ? compareStrings(value1, value2) : compareStrings(value2, value1);
        }),
    [searchQuery, sortBy, sortType, comments],
  );

  return { filteredComments };
};
