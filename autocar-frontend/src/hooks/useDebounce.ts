import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number) => {
  const [valueDebounce, setValueDebounce] = useState<string>(value);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setValueDebounce(value);
    }, delay);
    return () => clearTimeout(timeOut);
  }, [value, delay]);
  return valueDebounce;
};
