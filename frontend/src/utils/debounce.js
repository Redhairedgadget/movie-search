import { useState } from "react";

export const useDebounce = (callback, delay) => {
  const [timer, setTimer] = useState(null);

  const debounce = (...args) => {
    clearTimeout(timer);
    setTimer(setTimeout(() => callback(...args), delay));
  };

  return debounce;
};