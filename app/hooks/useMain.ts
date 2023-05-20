import { useEffect, useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import {
  addColumn,
  addTask,
  getBoard,
  reorderColumn,
  reorderTask,
} from 'services';
import { Board } from 'types/global';

const queryAttr = 'data-rbd-drag-handle-draggable-id';

export const useMain = () => {
  const [data, setData] = useState<Board>({
    tasks: {},
    columns: {},
    columnOrder: [],
  });

  const [dragId, setDragId] = useState('');
  const [placeholderProps, setPlaceholderProps] = useState({});

  const getData = async () => {
    try {
      const board = await getBoard();
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
    setPlaceholderProps({});

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

  const addMoreColumns = async () => {
    const lastColumnId = data?.columnOrder?.at(-1);
    const lastIndexOfColumn = lastColumnId
      ? data?.columns[lastColumnId]?.columnPosition
      : null;
    try {
      const response = await addColumn(lastIndexOfColumn);
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

  const addMoreTasks = async (columnId: string) => {
    try {
      const lastTaskId = data?.columns[columnId].taskIds.at(-1);
      const lastIndexInColumn = lastTaskId
        ? data?.tasks[lastTaskId].taskPosition
        : null;
      const response = await addTask(columnId, lastIndexInColumn);

      const newTaskInfo = response;
      setData((prev) => ({
        ...prev,
        tasks: {
          ...prev.tasks,
          [newTaskInfo.id]: newTaskInfo,
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

  const getDraggedDom = (draggableId) => {
    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);

    return draggedDOM;
  };

  const onDragStart = (start) => {};

  const onDragUpdate = (update) => {
    console.log(update);
    if (!update.destination) {
      return;
    }
    const draggableId = update.draggableId;
    const destinationIndex = update.destination.index;

    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);

    const droppabbleQuery = `[data-rbd-droppable-id='${update.destination.droppableId}']`;
    const droppabbleQueryDOM =
      document?.querySelector(droppabbleQuery)?.children[0].children;

    if (!draggedDOM) {
      return;
    }
    const { clientHeight, clientWidth } = draggedDOM;

    // console.log(ba2);

    // console.log('ch', draggedDOM.parentNode?.children);
    // console.log(draggedDOM.parentNode?.children);

    const clientY =
      // parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
      [...droppabbleQueryDOM]
        .slice(0, destinationIndex)
        .reduce((total, curr) => {
          const style = curr.currentStyle || window.getComputedStyle(curr);
          const marginBottom = parseFloat(style.marginBottom);
          return total + curr.clientHeight + marginBottom;
        }, 0);

    console.log(clientY);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(
        window.getComputedStyle(draggedDOM.parentNode).paddingLeft
      ),
    });
  };

  return {
    data,
    setData,
    onDragEnd,
    addMoreColumns,
    addMoreTasks,
    onDragStart,
    onDragUpdate,
    // before,
    dragId,
    placeholderProps,
  };
};
