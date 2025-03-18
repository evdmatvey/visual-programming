import { useEffect } from 'react';

export const useOutsideClick = (ref, clickCallback) => {
  useEffect(() => {
    const clickOutsideHandler = (e) => {
      if (ref.current && !e.composedPath().includes(ref.current)) {
        clickCallback();
      }
    };

    document.body.addEventListener('click', clickOutsideHandler);

    return () => document.body.removeEventListener('click', clickOutsideHandler);
  }, []);
};
