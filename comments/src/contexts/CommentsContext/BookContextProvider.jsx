import React from 'react';
import { useState } from 'react';
import { CommentsContext } from './context';

export const CommentsContextProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState('asc');
  const [sortBy, setSortBy] = useState('name');

  const value = {
    searchQuery,
    sortBy,
    sortType,
    setSearchQuery,
    setSortType,
    setSortBy,
  };

  return <CommentsContext.Provider value={value}>{children}</CommentsContext.Provider>;
};
