import { useEffect, useState } from 'react';

export const useFetchBookInfo = (isbn) => {
  const [bookInfo, setBookInfo] = useState(null);

  useEffect(() => {
    let retries = 0;
    let timeoutId;

    const fetchBookInfo = async () => {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn%3A${isbn}`);

      if (res.status === 429 && retries < 10 && !bookInfo) {
        retries++;
        timeoutId = setTimeout(() => {
          fetchBookInfo();
        }, 1000);
        return;
      }

      if (!res.ok) return;

      const fetchedBookInfo = await res.json();
      setBookInfo(fetchedBookInfo);
    };

    fetchBookInfo();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isbn]);

  return bookInfo;
};
