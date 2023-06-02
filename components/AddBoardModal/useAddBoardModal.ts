import { useRef } from 'react';

export const useAddBoardModal = () => {
  const inputValue = useRef<HTMLInputElement>(null);

  return { inputValue };
};
