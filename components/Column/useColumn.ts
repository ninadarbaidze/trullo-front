import { useRef, useState } from 'react';

export const useColumn = (
  addMoreTasks: (arg1: string, arg2: string) => void,
  columnId: string
) => {
  const [taskInputIsOpen, setTaskInputIsOpen] = useState(false);
  const inputValue = useRef<HTMLTextAreaElement>(null);

  const submitTaskHandler = () => {
    setTaskInputIsOpen(false);
    addMoreTasks(columnId, inputValue.current!.value);
    inputValue.current!.value = '';
  };

  const submitOnEnterHandler = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      submitTaskHandler();
    }
  };

  return {
    inputValue,
    taskInputIsOpen,
    setTaskInputIsOpen,
    submitTaskHandler,
    submitOnEnterHandler,
  };
};
