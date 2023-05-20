import React from 'react';
import { TaskType } from 'types/global';
import { Task } from 'components';

const TaskList: React.FC<{ tasks: TaskType[] }> = (props) => {
  return (
    <>
      {props.tasks.map((task, index: number) => (
        <Task task={task} index={index} key={task.id} />
      ))}
    </>
  );
};

export default TaskList;
