import React from 'react';
import { useState } from 'react';
import { BooksContext } from './context';

export const BooksContextProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState('asc');
  const [sortBy, setSortBy] = useState('title');

  const value = {
    searchQuery,
    sortBy,
    sortType,
    setSearchQuery,
    setSortType,
    setSortBy,
  };

  return <BooksContext.Provider value={value}>{children}</BooksContext.Provider>;
};
