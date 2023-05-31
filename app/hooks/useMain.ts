import { getCookie, setCookie } from 'cookies-next';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { DragUpdate, DropResult } from 'react-beautiful-dnd';
import {
  addColumn,
  addTask,
  deleteColumn,
  deleteTask,
  getBoard,
  reorderColumn,
  reorderTask,
} from 'services';
import { Board, Placeholder } from 'types/global';

export const useMain = () => {
  const [data, setData] = useState<Board>({
    tasks: {},
    columns: {},
    columnOrder: [],
  });

  const params = useParams();

  const [columnInputIsOpen, setColumnInputIsOpen] = useState(false);

  const [placeholderProps, setPlaceholderProps] = useState<Placeholder>({
    clientHeight: null,
    clientWidth: null,
    clientX: null,
    clientY: null,
  });

  const inputValue = useRef<HTMLInputElement>(null);

  const getData = async () => {
    try {
      const board = await getBoard(+params.id, getCookie('token') as string);
      setCookie('board', board.name);
      setData(board);
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const reorderTaskHandler = async (
    taskId: number,
    prevTaskId: number,
    nextTaskId: number,
    isChangingColumn: boolean,
    columnId: number
  ) => {
    await reorderTask(
      taskId,
      prevTaskId,
      nextTaskId,
      isChangingColumn,
      columnId
    );
  };

  const reorderColumnHandler = async (
    columnId: string,
    prevColumnId: number,
    nextColumnId: number
  ) => {
    await reorderColumn(+columnId, prevColumnId, nextColumnId);
  };

  const onDragEnd = (result: DropResult) => {
    setPlaceholderProps({
      clientHeight: null,
      clientWidth: null,
      clientX: null,
      clientY: null,
    });

    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === 'column') {
      const newColumnOrder = Array.from(data?.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      const prevColumnIndex =
        data?.columns[newColumnOrder[result?.destination!.index - 1]]
          ?.columnPosition;
      const nextColumnIndex =
        data?.columns[newColumnOrder[result?.destination!.index + 1]]
          ?.columnPosition;
      setData((prev) => ({
        ...prev,
        columnOrder: newColumnOrder,
      }));
      reorderColumnHandler(
        draggableId.slice(7),
        prevColumnIndex,
        nextColumnIndex
      );
      return;
    }

    const start = data?.columns[source.droppableId];
    const finish = data?.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newStart = { ...start, taskIds: newTaskIds };

      setData((prev) => ({
        ...prev,
        columns: { ...prev.columns, [newStart?.id]: newStart },
      }));

      const prevTaskIndex =
        data?.tasks[newTaskIds[result?.destination!.index - 1]]?.taskPosition;
      const nextTaskIndex =
        data?.tasks[newTaskIds[result?.destination!.index + 1]]?.taskPosition;

      reorderTaskHandler(
        +draggableId.slice(5),
        prevTaskIndex,
        nextTaskIndex,
        false,
        +destination.droppableId.slice(7)
      );

      return;
    }

    const startTaskIds = Array.from(start?.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = { ...start, taskIds: startTaskIds };

    const finishTaskIds = Array.from(finish?.taskIds);

    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };
    const prevTaskIndex =
      data?.tasks[finishTaskIds[result?.destination!.index - 1]]?.taskPosition;
    const nextTaskIndex =
      data?.tasks[finishTaskIds[result?.destination!.index + 1]]?.taskPosition;

    setData((prev) => ({
      ...prev,
      columns: {
        ...prev.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    }));
    reorderTaskHandler(
      +draggableId.slice(5),
      prevTaskIndex,
      nextTaskIndex,
      true,
      +destination.droppableId.slice(7)
    );
  };

  const onDragUpdate = (update: DragUpdate) => {
    if (!update.destination) {
      return;
    }
    const draggableId = update.draggableId;
    const destinationIndex = update.destination.index;

    const dragHandleId = `[data-rbd-drag-handle-draggable-id='${draggableId}']`;
    const draggedDOM = document.querySelector(dragHandleId);

    const dropHandleId = `[data-rbd-droppable-id='${update.destination.droppableId}']`;
    const dropDOM = document?.querySelector(dropHandleId)?.children[0]
      .children as HTMLCollectionOf<HTMLElement>;

    if (!draggedDOM || !dropHandleId) {
      return;
    }
    const { clientHeight, clientWidth } = draggedDOM;

    const clientY = Array.from(dropDOM)
      .slice(0, destinationIndex)
      .reduce((total, curr) => {
        const style =
          (curr as any).currentStyle || window.getComputedStyle(curr);
        const marginBottom = parseFloat(style.marginBottom);
        return total + curr.clientHeight + marginBottom;
      }, 0);

    const parentNode = draggedDOM.parentNode;

    if (parentNode instanceof Element) {
      const paddingLeft = window.getComputedStyle(parentNode).paddingLeft;
      setPlaceholderProps({
        clientHeight,
        clientWidth,
        clientY,
        clientX: parseFloat(paddingLeft),
      });
    }
  };

  const addMoreColumns = async (title: string) => {
    if (!title) return;
    const lastColumnId = data?.columnOrder?.at(-1);
    const lastIndexOfColumn = lastColumnId
      ? data?.columns[lastColumnId]?.columnPosition
      : null;
    try {
      const response = await addColumn(lastIndexOfColumn, title);
      const newColumnInfo = response;
      setData((prev) => ({
        ...prev,
        columnOrder: [...prev.columnOrder, newColumnInfo.id],
        columns: {
          ...prev.columns,
          [newColumnInfo.id]: { ...newColumnInfo, taskIds: [] },
        },
      }));
    } catch (err: any) {
      console.error(err);
    }
  };

  const addMoreTasks = async (columnId: string, content: string) => {
    try {
      if (!content) return;
      const lastTaskId = data?.columns[columnId].taskIds.at(-1);
      const lastIndexInColumn = lastTaskId
        ? data?.tasks[lastTaskId].taskPosition
        : null;
      const response = await addTask(columnId, lastIndexInColumn, content);

      const newTaskInfo = response;
      setData((prev) => ({
        ...prev,
        tasks: {
          ...prev.tasks,
          [newTaskInfo.id]: newTaskInfo,
          [newTaskInfo.content]: content,
        },
        columns: {
          ...prev.columns,
          [columnId]: {
            ...prev.columns[columnId],
            taskIds: [...prev.columns[columnId].taskIds, newTaskInfo.id],
          },
        },
      }));
    } catch (err: any) {
      console.error(err);
    }
  };

  const submitColumnHandler = () => {
    setColumnInputIsOpen(false);
    addMoreColumns(inputValue.current!.value);
    inputValue.current!.value = '';
  };

  const deleteTaskHandler = async (taskId: string, columnId: string) => {
    try {
      setData((prev) => {
        const { tasks, columns, ...rest } = prev;
        const newTasks = { ...tasks };
        const newColumns = { ...columns };

        delete newTasks[taskId];
        newColumns[columnId].taskIds = newColumns[columnId].taskIds.filter(
          (task) => task !== taskId
        );

        return { tasks: newTasks, columns: newColumns, ...rest };
      });
      await deleteTask(taskId);
    } catch (err: any) {
      console.error(err);
    }
  };

  const deleteColumnHandler = async (columnId: string) => {
    try {
      setData((prev) => {
        const { columnOrder, columns, ...rest } = prev;
        const newColumns = { ...columns };

        delete newColumns[columnId];

        return {
          columns: newColumns,
          columnOrder: columnOrder.filter((column) => column !== columnId),
          ...rest,
        };
      });
      await deleteColumn(columnId);
    } catch (err: any) {
      console.error(err);
    }
  };

  const changeColumnNameHandler = (columnId: string, title: string) => {
    setData((prev) => ({
      ...prev,
      columns: {
        ...prev.columns,
        [columnId]: { ...prev.columns[columnId], title },
      },
    }));
  };

  return {
    data,
    setData,
    onDragEnd,
    addMoreColumns,
    addMoreTasks,
    onDragUpdate,
    placeholderProps,
    columnInputIsOpen,
    setColumnInputIsOpen,
    inputValue,
    submitColumnHandler,
    deleteTaskHandler,
    deleteColumnHandler,
    changeColumnNameHandler,
  };
};
