'use client';

import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { TaskType } from 'types/global';
import { ThreeDots } from '../icons';
import { ActionDialog } from 'components';
import { useTask } from './useTask';

const Task: React.FC<{
  task: TaskType;
  index: number;
  key: string;
  deleteTaskHandler: (taskId: string, columnId: string) => void;
}> = (props) => {
  const {
    taskDialogIsOpen,
    triggerRef,
    dropdownRef,
    dropdownToggler,
    deleteTask,
  } = useTask(props.task, props.deleteTaskHandler);

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
            }  pb-16 px-2 rounded-xl shadow-md mb-4 relative`}
          >
            {taskDialogIsOpen && (
              <div className='absolute top-6 right-0' ref={dropdownRef}>
                <ActionDialog deleteHandler={deleteTask} />
              </div>
            )}
            <section className='flex items-start justify-between py-2'>
              <div className='pr-1'>{props.task.content}</div>
              <button
                ref={triggerRef}
                className='pt-1'
                onClick={() => dropdownToggler()}
              >
                <ThreeDots color='#828282' />
              </button>
            </section>
          </li>
        )}
      </Draggable>
    </>
  );
};

export default Task;
