import React from 'react';
import Task from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { ColumnType, TaskType } from 'types/global';

const Column: React.FC<{
  tasks: TaskType[];
  column: ColumnType;
  index: number;
  addMoreTasks: (arg1: string) => void;
}> = (props) => {
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <li
          className='flex flex-col gap-2 border p-5 '
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <h2 className='text-xl bg-white' {...provided.dragHandleProps}>
            {props.column.title}
          </h2>

          <ul className='flex flex-col gap-3 w-44'>
            <Droppable droppableId={props.column.id} type='task'>
              {(provided, snapshot) => (
                <li
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`${
                    snapshot.isDraggingOver ? 'bg-black' : 'bg-white'
                  } flex-grow min-h-[100px]`}
                >
                  {props.tasks.map((task, index: number) => (
                    <Task key={task.id as string} task={task} index={index} />
                  ))}
                  {provided.placeholder}
                </li>
              )}
            </Droppable>
            <p onClick={() => props.addMoreTasks(props.column.id)}>+add more</p>
          </ul>
        </li>
      )}
    </Draggable>
  );
};

export default Column;
