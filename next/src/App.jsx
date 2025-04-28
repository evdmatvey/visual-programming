import React, { useState, useEffect, useRef } from 'react';
import { ProgressBar } from './components/ProgressBar';

const App = () => {
  const [data, setData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isCanceled, setIsCanceled] = useState(false);
  const abortController = useRef(null);
  const startTime = useRef(Date.now());
  const totalTime = 10000;

  const fetchData = async () => {
    try {
      abortController.current = new AbortController();

      await new Promise((resolve) => setTimeout(resolve, totalTime));

      const response = await fetch('https://fakeapi.extendsclass.com/countries', {
        signal: abortController.current.signal,
      });

      if (!response.ok) throw new Error(`Ошибка: ${response.status}`);

      const result = await response.json();
      setData(result);
      setIsLoading(false);
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Запрос отменён');
      } else {
        console.error('Ошибка при загрузке:', err);
        setIsCanceled(true);
        setProgress(100);
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isCanceled) {
        const elapsed = Date.now() - startTime.current;
        const newProgress = (elapsed / totalTime) * 100;
        setProgress(Math.min(newProgress, 100));
      }
    }, 100);

    fetchData();

    return () => {
      clearInterval(timer);
      if (abortController.current) {
        abortController.current.abort();
      }
    };
  }, []);

  const handleCancel = () => {
    if (abortController.current) {
      abortController.current.abort();
      setIsCanceled(true);
      setProgress(100);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="wrapper">
          <ProgressBar title="Loading countries..." percentage={progress} isCanceled={isCanceled} />
          <button className="button" onClick={handleCancel} disabled={isCanceled}>
            X
          </button>
        </div>
      ) : (
        <ul className="container">
          {data.map((country, index) => (
            <li key={index}>{country.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
