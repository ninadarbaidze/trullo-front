'use client';
import React from 'react';
import { useBoardMenuModal } from './useBoardMenuModal';
import {
  XMarkIcon,
  UserCircleIcon,
  DocumentTextIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import Image, { ImageLoader } from 'next/image';
import { UserInfo } from 'components';
import { SetState, UserProfile } from 'types/global';
import { getFormattedDate } from 'helpers';

const BoardMenuModal: React.FC<{ setBoardMenu: SetState<boolean> }> = (
  props
) => {
  const { board, boardDetail, deleteUserFromBoardHandler } =
    useBoardMenuModal();
  return (
    <section className='flex flex-col bg-white shadow-md fixed top-16 right-0 w-[30%] z-[45] px-4 py-6 pb-24 h-full overflow-y-scroll'>
      <div className='flex w-full items-center justify-between border-b-2 '>
        <h2 className='text-base font-semibold capitalize'>{board} board</h2>
        <XMarkIcon
          className='w-6 cursor-pointer'
          onClick={() => props.setBoardMenu(false)}
        />
      </div>
      <div className='flex flex-col gap-5 mt-4'>
        <article className='flex flex-col gap-6'>
          <div className='flex text-gray400 font-medium items-center gap-2 text-xs'>
            <UserCircleIcon className='w-3' />
            Made by
          </div>
          <div className='w-full h-10 overflow-clip rounded-lg'>
            <UserInfo
              user={boardDetail?.boardOwner as UserProfile}
              additionalText={`on ${getFormattedDate(boardDetail?.createdAt)}`}
            />
          </div>
        </article>
        <article className='flex flex-col gap-6'>
          <div className='flex text-gray400 font-medium items-center gap-2 text-xs'>
            <DocumentTextIcon className='w-3' />
            Description
          </div>
          <div className='w-full rounded-md border border-gray400 p-2'>
            Simple board to start on a project. Each list can hold items (cards)
            that represent ideas or tasks. There 4 lists here: * Backlog 🤔 :
            Ideas are created here. Here people can describe the idea following
            three simple questions: Why you wish to do it, What it is, how can
            you do it. * In Progress📚: Once th Simple board to start on a
            project. Each list can hold items (cards) that represent ideas or
            tasks. There 4 lists here: * Backlog 🤔 : Ideas are created here.
          </div>
        </article>
        <article className='flex flex-col gap-6'>
          <div className='flex text-gray400 font-medium items-center gap-2  text-xs'>
            <UserGroupIcon className='w-3' />
            Team
          </div>
          <ul className='flex flex-col gap-4'>
            <li className='flex items-center justify-between'>
              <UserInfo user={boardDetail?.boardOwner as UserProfile} />
              <p className='text-sm text-gray-400'>Admin</p>
            </li>
            {boardDetail?.users
              .filter((user) => user.id !== boardDetail.boardOwnerId)
              .map((user) => (
                <li key={user.id} className='flex justify-between items-center'>
                  <UserInfo user={user} />
                  <button
                    className='text-sm text-red-500 border rounded-lg border-red-500 px-4 h-8'
                    onClick={() => deleteUserFromBoardHandler(user.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
          </ul>
        </article>
      </div>
    </section>
  );
};

export default BoardMenuModal;
