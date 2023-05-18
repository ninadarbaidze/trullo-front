'use client';
import Column from 'components/Column';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useMain } from './hooks';

export default function Home() {
  const { data, onDragEnd, addMoreColumns, addMoreTasks } = useMain();

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
              {data?.columnOrder?.map((columnId: string, index: number) => {
                const column = data?.columns[columnId];
                const tasks = column?.taskIds?.map(
                  (taskId) => data?.tasks[taskId]
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
              <p onClick={() => addMoreColumns()}>+add more</p>
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </main>
  );
}
