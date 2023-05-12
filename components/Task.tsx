import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Task: React.FC<any> = (props) => {
  return (
    <div className=''>
      <Draggable
        draggableId={props.task.id}
        index={props.index}
        // isDragDisabled={'task-1'}
      >
        {(provided, snapshot) => (
          <h2
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`${
              snapshot.isDragging ? 'bg-red-600 rotate-3' : 'bg-white'
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
