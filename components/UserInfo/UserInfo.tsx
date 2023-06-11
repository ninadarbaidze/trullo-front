'use client';
import React from 'react';
import { UserProfile } from 'types/global';
import Image, { ImageLoader } from 'next/image';
import { getAvatarHandler, getFirstInitials } from 'helpers';

const UserInfo: React.FC<{
  user: Partial<UserProfile>;
  additionalText?: string;
}> = (props) => {
  return (
    <div className='flex items-center gap-3'>
      <div className='w-10 h-10 overflow-clip rounded-lg'>
        {props.user?.avatar ? (
          <Image
            src={getAvatarHandler(props.user) as 'string | StaticImport'}
            loader={(() => getAvatarHandler(props.user)) as ImageLoader}
            width={100}
            height={100}
            alt='default_profile'
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center bg-gray400 text-white'>
            {getFirstInitials(props.user?.firstName, props.user?.lastName)}
          </div>
        )}
      </div>
      <div className='flex flex-col'>
        <p className='text-sm font-bold truncate w-36'>{`${props.user?.firstName}  ${props.user?.lastName}`}</p>
        {<p className='text-xs text-gray400'>{props.additionalText}</p>}
      </div>
    </div>
  );
};

export default UserInfo;
