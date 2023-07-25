import React from 'react';
import { Board } from 'types/global';
import Image from 'next/image';
import { getFirstInitials } from 'helpers';

const AssignedUserList: React.FC<{
  users: Board['users'];
  numberOfEmployeesToShow: number;
}> = (props) => {
  return (
    <ul className='flex items-center gap-2 my-4'>
      {props.users.slice(0, props.numberOfEmployeesToShow).map((user) =>
        user.avatar ? (
          <li
            className='w-8 h-8 overflow-clip rounded-lg relative'
            key={user.id}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${user?.avatar}`}
              loader={() =>
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/${user?.avatar}`
              }
              fill
              alt='user_avatar'
            />
          </li>
        ) : (
          <li
            key={user.id}
            className='w-8 h-8 rounded-md flex items-center justify-center bg-gray400 text-white'
          >
            {getFirstInitials(user?.firstName, user?.lastName)}
          </li>
        )
      )}
      <p className='text-xs text-gray300'>
        {props.users.length > props.numberOfEmployeesToShow &&
          `+${props.users.length - props.numberOfEmployeesToShow} other`}
      </p>
    </ul>
  );
};

export default AssignedUserList;
