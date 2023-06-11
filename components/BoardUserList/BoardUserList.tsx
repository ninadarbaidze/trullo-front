import React from 'react';
import Image from 'next/image';
import { getFirstInitials } from 'helpers';
import { Board } from 'types/global';

const BoardUserList: React.FC<{ data: Board }> = (props) => {
  return (
    <>
      {props.data.users.map((user) =>
        user.avatar ? (
          <li className='w-8 h-8 overflow-clip rounded-lg' key={user.id}>
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${user?.avatar}`}
              loader={() =>
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/${user?.avatar}`
              }
              width={100}
              height={100}
              alt=''
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
    </>
  );
};

export default BoardUserList;
