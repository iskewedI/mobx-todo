import { useEffect, useState } from 'react';

export default function useDebounce(value: string | undefined, timeMs: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, timeMs);

    return () => clearTimeout(timer);
  }, [value, timeMs]);

  return debouncedValue;
}
