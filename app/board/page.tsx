'use client';
import Column from 'components/Column/Column';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useMain } from '../hooks';

export default function Home() {
  const {
    data,
    onDragEnd,
    addMoreColumns,
    addMoreTasks,
    onDragUpdate,
    placeholderProps,
  } = useMain();

  return (
    <div className='flex flex-row pl-24 py-24  text-black'>
      <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
        <Droppable
          droppableId='all-columns'
          direction='horizontal'
          type='column'
        >
          {(provided) => (
            <ul
              className='flex bg-babyBlue rounded-xl w-full'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <>
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
                      placeholderProps={placeholderProps}
                    />
                  );
                })}

                {provided.placeholder}

                <p onClick={() => addMoreColumns()}>+add more</p>
              </>
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
