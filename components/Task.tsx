import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { TaskType } from 'types/global';

const Task: React.FC<{ task: TaskType; index: number; key: string }> = (
  props
) => {
  return (
    <>
      <Draggable
        draggableId={props.task.id as string}
        index={props.index}
        key={props.key}
      >
        {(provided, snapshot) => (
          <li
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`${
              snapshot.isDragging ? 'bg-white' : 'bg-white'
            } pb-16 rounded-xl shadow-md mb-4`}
          >
            <div>{props.task.content}</div>
          </li>
        )}
        {}
      </Draggable>
    </>
  );
};

export default Task;
