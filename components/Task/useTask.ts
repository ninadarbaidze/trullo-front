import { addClickAwayHandler } from 'helpers';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SetState, TaskType } from 'types/global';

export const useTask = (
  task: TaskType,
  deleteTaskHandler: (taskId: string, columnId: string) => void,
  setRefreshBoard: SetState<boolean>
) => {
  const [taskDialogIsOpen, setTaskDialogIsOpen] = useState(false);
  const [taskDetailsIsOpen, setTaskDetailsIsOpen] = useState(false);
  const searchParams = useSearchParams();

  const taskId = searchParams.get('task_id');
  const pathname = usePathname();

  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const dropdownToggler = () => {
    addClickAwayHandler(triggerRef, dropdownRef, setTaskDialogIsOpen);
    setTaskDialogIsOpen((prev) => !prev);
  };

  const deleteTask = () => {
    deleteTaskHandler(task.id, `column-${task.columnId}`);
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const openTaskDetailsHandler = () => {
    setTaskDetailsIsOpen(true);
    router.push(
      pathname + '?' + createQueryString('task_id', task.id.slice(5))
    );
  };

  const closeTaskModal = () => {
    setRefreshBoard((prev) => !prev);
    router.push(pathname);
  };

  useEffect(() => {
    taskId === task.id.slice(5) && setTaskDetailsIsOpen(true);
  }, [task.id, taskId]);

  return {
    taskDialogIsOpen,
    setTaskDialogIsOpen,
    triggerRef,
    dropdownRef,
    dropdownToggler,
    deleteTask,
    taskDetailsIsOpen,
    openTaskDetailsHandler,
    setTaskDetailsIsOpen,
    taskId,
    closeTaskModal,
  };
};
