import { useEffect, useState } from 'react';

export const useFetchBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch('https://fakeapi.extendsclass.com/books');
        const fetchedBooks = await res.json();

        setBooks(fetchedBooks);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooks();
  }, []);

  return books;
};
