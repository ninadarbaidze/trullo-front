'use client';
import axios from 'axios';
import Column from 'components/Column';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

export default function Home() {
  const [data, setData] = useState<any>({});

  const getData = async () => {
    try {
      const response = await axios(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/board/1`
      );
      setData(response.data);
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const reorderTask = async (
    taskId: number,
    prevTaskId: number,
    nextTaskId: number,
    isChangingColumn: boolean,
    columnId: number
  ) => {
    await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/reorder/${taskId}`,
      { columnId, isChangingColumn, prevTaskId, nextTaskId },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  };

  const reorderColumn = async (
    columnId: number,
    prevColumnId: number,
    nextColumnId: number
  ) => {
    await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/reorder-column/${columnId}`,
      { boardId: 1, prevColumnId, nextColumnId },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  };

  const onDragEnd = (result: any) => {
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
        data.columns[newColumnOrder[result.destination.index - 1] as any]
          ?.columnPosition;
      const nextColumnIndex =
        data.columns[newColumnOrder[result.destination.index + 1] as any]
          ?.columnPosition;
      setData((prev: any) => ({ ...prev, columnOrder: newColumnOrder }));
      reorderColumn(draggableId.slice(7), prevColumnIndex, nextColumnIndex);
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newStart = { ...start, taskIds: newTaskIds };

      setData((prev: any) => ({
        ...prev,
        columns: { ...prev.columns, [newStart.id]: newStart },
      }));

      const prevTaskIndex =
        data.tasks[newTaskIds[result.destination.index - 1] as any]
          ?.taskPosition;
      const nextTaskIndex =
        data.tasks[newTaskIds[result.destination.index + 1] as any]
          ?.taskPosition;

      reorderTask(
        draggableId.slice(5),
        prevTaskIndex,
        nextTaskIndex,
        false,
        destination.droppableId.slice(7)
      );

      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = { ...start, taskIds: startTaskIds };

    const finishTaskIds = Array.from(finish.taskIds);

    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };
    const prevTaskIndex =
      data.tasks[finishTaskIds[result.destination.index - 1] as any]
        ?.taskPosition;
    const nextTaskIndex =
      data.tasks[finishTaskIds[result.destination.index + 1] as any]
        ?.taskPosition;

    setData((prev: any) => ({
      ...prev,
      columns: {
        ...prev.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    }));
    reorderTask(
      draggableId.slice(5),
      prevTaskIndex,
      nextTaskIndex,
      true,
      destination.droppableId.slice(7)
    );
  };

  const addMoreColumns = async () => {
    const lastColumnId = data.columnOrder?.at(-1);
    const lastIndexOfColumn = lastColumnId
      ? data?.columns[lastColumnId]?.columnPosition
      : null;
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/createColumn/1`,
        { title: 'todo', prevIndex: lastIndexOfColumn },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const newColumnInfo = response.data;
      setData((prev: any) => ({
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
      const lastTaskId = data.columns[columnId].taskIds.at(-1);
      const lastIndexInColumn = lastTaskId
        ? data.tasks[lastTaskId].taskPosition
        : null;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/task/${columnId.slice(7)}`,
        { content: 'task6', prevIndex: lastIndexInColumn },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const newTaskInfo = response.data;
      setData((prev: any) => ({
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

  return (
    <main className='flex h-screen p-24 bg-white text-black'>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId='all-columns'
          direction='horizontal'
          type='column'
        >
          {(provided) => (
            <ul
              className='flex'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {data.columnOrder?.map((columnId: number, index: number) => {
                const column = data.columns[columnId];
                const tasks = column?.taskIds?.map(
                  (taskId: any) => data.tasks[taskId]
                );
                return (
                  <Column
                    key={column.id}
                    column={column}
                    tasks={tasks}
                    index={index}
                    addMoreTasks={addMoreTasks}
                  />
                );
              })}
              {provided.placeholder}
              <p onClick={() => addMoreColumns()}>+add more</p>;
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </main>
  );
}
