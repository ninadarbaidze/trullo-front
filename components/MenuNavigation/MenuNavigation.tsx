import {
  UserCircleIcon,
  SquaresPlusIcon,
  PowerIcon,
} from '@heroicons/react/24/outline';
import { logOutHandler } from 'helpers';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const MenuNavigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = (page: string) => {
    return pathname.includes(page);
  };
  return (
    <>
      {' '}
      <Link
        className={`${
          isActive('profile') ? 'text-blue500' : 'text-black'
        } flex items-center gap-1 text-sm hover:text-blue500`}
        href={'/profile'}
      >
        <UserCircleIcon className='h-4' />
        Profile
      </Link>
      <Link
        className={`${
          isActive('boards') ? 'text-blue500' : 'text-black'
        } flex items-center gap-1 text-sm hover:text-blue500`}
        href={'/boards'}
      >
        <SquaresPlusIcon className='h-4' />
        Boards
      </Link>
      <button
        className={` flex items-center gap-1 text-sm hover:text-blue500`}
        onClick={() => {
          logOutHandler(router);
        }}
      >
        <PowerIcon className='h-4' /> Logout
      </button>
    </>
  );
};

export default MenuNavigation;
