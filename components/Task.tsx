import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { TaskType } from 'types/global';

const Task: React.FC<{ task: TaskType; index: number }> = (props) => {
  return (
    <div className={`bg-white`}>
      <Draggable
        draggableId={props.task.id as string}
        index={props.index}
        key={props.key}
      >
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`${
              snapshot.isDragging ? 'bg-white' : 'bg-white'
            } rounded-xl shadow-sm bg-white`}
          >
            <div>{props.task.content}</div>
          </div>
        )}
        {}
      </Draggable>
    </div>
  );
};

export default Task;
