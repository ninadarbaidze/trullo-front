import { addClickAwayHandler } from 'helpers';
import { useRef, useState } from 'react';

export const useColumn = (
  addMoreTasks: (arg1: string, arg2: string) => void,
  columnId: string,
  deleteColumnHandler: (columnId: string) => void
) => {
  const [taskInputIsOpen, setTaskInputIsOpen] = useState(false);
  const [columnDialogIsOpen, setColumnDialogIsOpen] = useState(false);
  const inputValue = useRef<HTMLTextAreaElement>(null);

  const submitTaskHandler = () => {
    setTaskInputIsOpen(false);
    addMoreTasks(columnId, inputValue.current!.value);
    inputValue.current!.value = '';
  };
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dropdownToggler = () => {
    addClickAwayHandler(triggerRef, dropdownRef, setColumnDialogIsOpen);
    setColumnDialogIsOpen((prev) => !prev);
  };

  const deleteColumn = () => {
    deleteColumnHandler(columnId);
  };

  return {
    inputValue,
    taskInputIsOpen,
    setTaskInputIsOpen,
    submitTaskHandler,
    triggerRef,
    dropdownRef,
    columnDialogIsOpen,
    dropdownToggler,
    deleteColumn,
  };
};
