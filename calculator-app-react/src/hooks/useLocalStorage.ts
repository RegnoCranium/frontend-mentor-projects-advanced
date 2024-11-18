import { useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const getStoredValue = (): T => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  };

  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue] as const;
}

export default useLocalStorage;
