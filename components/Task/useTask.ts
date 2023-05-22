import { addClickAwayHandler } from 'helpers';
import { useRef, useState } from 'react';
import { TaskType } from 'types/global';

export const useTask = (
  task: TaskType,
  deleteTaskHandler: (taskId: string, columnId: string) => void
) => {
  const [taskDialogIsOpen, setTaskDialogIsOpen] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dropdownToggler = () => {
    addClickAwayHandler(triggerRef, dropdownRef, setTaskDialogIsOpen);
    setTaskDialogIsOpen((prev) => !prev);
  };

  const deleteTask = () => {
    deleteTaskHandler(task.id, `column-${task.columnId}`);
  };

  return {
    taskDialogIsOpen,
    setTaskDialogIsOpen,
    triggerRef,
    dropdownRef,
    dropdownToggler,
    deleteTask,
  };
};
