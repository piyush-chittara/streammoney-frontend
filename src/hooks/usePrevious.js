import { useEffect, useRef } from 'react';

export const usePrevious = (value, initial) => {
  const ref = useRef(initial || null);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
