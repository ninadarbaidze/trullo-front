'use client';
import Column from 'components/Column';
import { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

export default function Home() {
  const initialData: any = {
    tasks: {
      'task-1': { id: 'task-1', content: 'Take out the garbage' },
      'task-2': { id: 'task-2', content: 'Watch my favorite show' },
      'task-3': { id: 'task-3', content: 'Charge my phone' },
      'task-4': { id: 'task-4', content: 'Cook dinner' },
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'To do',
        taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
      },
      'column-2': {
        id: 'column-2',
        title: 'In progress',
        taskIds: [],
      },
      'column-3': {
        id: 'column-3',
        title: 'Done',
        taskIds: [],
      },
    },
    columnOrder: ['column-1', 'column-2', 'column-3'],
  };

  const [data, setData] = useState(initialData);

  const onDragEnd = (result: any) => {
    console.log(result);
    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (type === 'column') {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      setData((prev: any) => ({ ...prev, columnOrder: newColumnOrder }));
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

    setData((prev: any) => ({
      ...prev,
      columns: {
        ...prev.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    }));
  };

  const addMoreColumns = () => {
    setData((prev: any) => ({
      ...prev,
      columnOrder: [
        ...prev.columnOrder,
        `column-${prev.columnOrder.length + 1}`,
      ],
      columns: {
        ...prev.columns,
        [`column-${prev.columnOrder.length + 1}`]: {
          id: `column-${prev.columnOrder.length + 1}`,
          title: 'New',
          taskIds: [],
        },
      },
    }));
  };

  console.log(data);
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
                  />
                );
              })}
              {provided.placeholder}
              <p onClick={() => addMoreColumns()}>+add more</p>
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </main>
  );
}
