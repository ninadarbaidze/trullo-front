'use client';

import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { TaskType, UserProfile } from 'types/global';
import { TaskDetailModal } from 'components';
import { useTask } from './useTask';
import Image from 'next/image';

const Task: React.FC<{
  task: TaskType;
  index: number;
  key: string;
  deleteTaskHandler: (taskId: string, columnId: string) => void;
  boardUsers: UserProfile[];
}> = (props) => {
  const { taskDetailsIsOpen, openTaskDetailsHandler, setTaskDetailsIsOpen } =
    useTask(props.task, props.deleteTaskHandler);

  return (
    <>
      {taskDetailsIsOpen && (
        <TaskDetailModal
          setTaskDetailsIsOpen={setTaskDetailsIsOpen}
          taskId={+props.task.id.slice(5)}
          boardUsers={props.boardUsers}
        />
      )}
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
            }  pb-16 px-2 rounded-xl shadow-md mb-4 relative z-10`}
            onClick={openTaskDetailsHandler}
          >
            <section className='flex flex-col items-start justify-between py-2 relative'>
              {props.task.image && (
                <div className='flex  overflow-clip w-full h-24 relative rounded-lg object-cover z-10'>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${props.task.image}`}
                    loader={() =>
                      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${props.task.image}`
                    }
                    alt='default_profile'
                    className='rounded'
                    fill
                    objectFit='cover'
                  />
                </div>
              )}

              <div className='pr-1'>{props.task.content}</div>
            </section>
          </li>
        )}
      </Draggable>
    </>
  );
};

export default Task;
