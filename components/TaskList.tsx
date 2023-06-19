'use client';
import React from 'react';
import { TaskType, UserProfile } from 'types/global';
import { Task } from 'components';

const TaskList: React.FC<{
  tasks: TaskType[];
  deleteTaskHandler: (taskId: string, columnId: string) => void;
  boardUsers: UserProfile[];
}> = (props) => {
  return (
    <>
      {props.tasks?.map((task, index: number) => (
        <Task
          task={task}
          index={index}
          key={task.id}
          deleteTaskHandler={props.deleteTaskHandler}
          boardUsers={props.boardUsers}
        />
      ))}
    </>
  );
};

export default TaskList;
