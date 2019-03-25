import { useRef } from 'react';

export const useInstance = () => {
  const instanceRef = useRef();
  return instanceRef.current;
};

export default useInstance;
