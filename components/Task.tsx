import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { TaskType } from 'types/global';

const Task: React.FC<{ task: TaskType; index: number }> = (props) => {
  return (
    <div className=''>
      <Draggable draggableId={props.task.id as string} index={props.index}>
        {(provided, snapshot) => (
          <h2
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`${
              snapshot.isDragging ? 'bg-red-600' : 'bg-white'
            }  border`}
          >
            {props.task.content}
          </h2>
        )}
        {}
      </Draggable>
    </div>
  );
};

export default Task;
