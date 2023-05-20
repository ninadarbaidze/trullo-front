import React from 'react';
import { TaskType } from 'types/global';
import { Task } from 'components';

const TaskList: React.FC<{ tasks: TaskType[] }> = (props) => {
  return (
    <div className={` flex flex-col  bg-white `}>
      {props.tasks.map((task, index: number) => (
        <Task
          key={task.id as string}
          task={task}
          index={index}
          isDragging={props.isDragging}
        />
      ))}
    </div>
  );
};

export default TaskList;
