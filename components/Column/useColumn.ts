import { useRef, useState } from 'react';

export const useColumn = () => {
  const [taskInputIsOpen, setTaskInputIsOpen] = useState(false);
  const inputValue = useRef<HTMLInputElement>(null);

  return { inputValue, taskInputIsOpen, setTaskInputIsOpen };
};
