import React from 'react';
import Image from 'next/image';
import { getFirstInitials } from 'helpers';
import { UserProfile } from 'types/global';
import { XMarkIcon } from '@heroicons/react/24/outline';

const BoardUserList: React.FC<{
  users: UserProfile[];
  deleteUser?: (userId: number) => void;
}> = (props) => {
  return (
    <>
      {props.users?.map((user) => (
        <li key={user.id} className='relative'>
          {props.deleteUser && (
            <button
              className='absolute -top-1 -right-1 z-50'
              type='button'
              onClick={() => props.deleteUser?.(user.id as number)}
            >
              <XMarkIcon className='bg-red-300 w-[0.8rem] rounded-full text-red-600' />
            </button>
          )}
          <div
            className={`w-8 h-8 rounded-lg  ${
              user?.avatar
                ? 'overflow-clip'
                : 'flex items-center justify-center bg-gray400 text-white'
            }`}
          >
            {user?.avatar ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${user?.avatar}`}
                loader={() =>
                  `${process.env.NEXT_PUBLIC_BACKEND_URL}/${user?.avatar}`
                }
                fill
                className='rounded-lg'
                alt=''
              />
            ) : (
              <div>{getFirstInitials(user?.firstName, user?.lastName)}</div>
            )}
          </div>
        </li>
      ))}
    </>
  );
};

export default BoardUserList;
