import { useEffect, useRef } from 'react';

export const usePrevious = (value, initial = null) => {
  const ref = useRef(initial);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
