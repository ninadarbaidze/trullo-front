import { getCookie } from 'cookies-next';
import { addClickAwayHandler } from 'helpers';
import { useRef, useState } from 'react';
import { updateColumn } from 'services';

export const useColumn = (
  addMoreTasks: (arg1: string, arg2: string) => void,
  columnId: string,
  deleteColumnHandler: (columnId: string) => void,
  changeColumnNameHandler: (columnId: string, title: string) => void
) => {
  const [taskInputIsOpen, setTaskInputIsOpen] = useState(false);
  const [columnDialogIsOpen, setColumnDialogIsOpen] = useState(false);
  const [isInEditMode, setIsInEditMode] = useState(false);
  const inputValue = useRef<HTMLTextAreaElement>(null);
  const columnName = useRef<HTMLInputElement>(null);

  const token = getCookie('token') as string;

  const submitTaskHandler = () => {
    setTaskInputIsOpen(false);
    addMoreTasks(columnId, inputValue.current!.value);
    inputValue.current!.value = '';
  };

  const editColumnHandler = async () => {
    try {
      setColumnDialogIsOpen(false);
      const newColumnTitle = columnName.current!.value;
      changeColumnNameHandler(columnId, newColumnTitle);
      await updateColumn(columnId, newColumnTitle, token);
      setIsInEditMode(false);
    } catch (err: any) {
      console.error(err);
    }
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

  const openColumnEditMode = () => {
    setColumnDialogIsOpen(false);
    setIsInEditMode(true);
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
    columnName,
    editColumnHandler,
    isInEditMode,
    setIsInEditMode,
    openColumnEditMode,
  };
};
