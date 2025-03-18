import { useEffect, useState } from 'react';

export const useFetchComments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/comments');
        const fetchedComments = await res.json();

        setComments(fetchedComments);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, []);

  return comments;
};
