import { useEffect, useState } from "react";

export function useDebouncedValue(value: string, delay?: number) {
  if (!delay) {
    delay = 500;
  }
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId: NodeJS.Timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
}
