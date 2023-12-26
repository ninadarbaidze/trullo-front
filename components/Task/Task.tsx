'use client';

import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { SetState, TaskType, UserProfile } from 'types/global';
import { AssignedUserList, LabelItem, TaskDetailModal } from 'components';
import { useTask } from './useTask';
import Image from 'next/image';

const Task: React.FC<{
  task: TaskType;
  index: number;
  key: string;
  deleteTaskHandler: (taskId: string, columnId: string) => void;
  boardUsers: UserProfile[];
  setRefreshBoard: SetState<boolean>;
}> = (props) => {
  const {
    taskDetailsIsOpen,
    openTaskDetailsHandler,
    setTaskDetailsIsOpen,
    taskId,
    closeTaskModal,
  } = useTask(props.task, props.deleteTaskHandler, props.setRefreshBoard);
  return (
    <>
      {taskDetailsIsOpen && (
        <TaskDetailModal
          setTaskDetailsIsOpen={setTaskDetailsIsOpen}
          taskId={taskId ? Number(taskId) : +props.task.id.slice(5)}
          boardUsers={props.boardUsers}
          closeTaskModal={closeTaskModal}
        />
      )}
      <Draggable
        draggableId={props.task.id as string}
        index={props.index}
        key={props.key}
      >
        {(provided) => (
          <li
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`bg-white px-2 rounded-xl shadow-md mb-4 relative z-10`}
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
            <ul className='flex flex-wrap gap-2 mt-2'>
              {props.task?.labels?.map((label, i) => (
                <LabelItem
                  label={label.label}
                  i={i}
                  key={i}
                  canNotEdit={true}
                />
              ))}
            </ul>
            <AssignedUserList
              users={props.task.users?.map((user) => user.user)!}
              numberOfEmployeesToShow={2}
            />
          </li>
        )}
      </Draggable>
    </>
  );
};

export default Task;
