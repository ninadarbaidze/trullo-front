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
        <li
          className={`w-8 h-8  ${
            user?.avatar
              ? 'overflow-clip rounded-lg '
              : 'rounded-md flex items-center justify-center bg-gray400 text-white'
          } relative`}
          key={user.id}
        >
          {props.deleteUser && (
            <button
              className='absolute top-0 right-0 z-50'
              type='button'
              onClick={() => props.deleteUser?.(user.id)}
            >
              <XMarkIcon className='bg-red-300 w-[0.8rem] rounded-full text-red-600' />
            </button>
          )}

          {user?.avatar ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${user?.avatar}`}
              loader={() =>
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/${user?.avatar}`
              }
              width={100}
              height={100}
              alt=''
            />
          ) : (
            <div>{getFirstInitials(user?.firstName, user?.lastName)}</div>
          )}
        </li>
      ))}
    </>
  );
};

export default BoardUserList;
