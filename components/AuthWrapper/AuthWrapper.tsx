'use client';

import { Logo } from 'components';
import { Tasks } from 'components/icons';
import { usePathname } from 'next/navigation';
import React from 'react';

const AuthWrapper: React.FC<{
  children: React.ReactNode;
  type: 'register' | 'login';
}> = (props) => {
  const path = usePathname();
  return (
    <>
      <div className='flex min-h-full flex-1'>
        <div className='flex flex-1 flex-col justify-center w-3/6 px-4 py-6 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
          <div className='mx-auto w-full max-w-sm lg:w-96'>
            <div>
              <Logo />
              <h2 className='mt-6 text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                {path.includes('login')
                  ? 'Login to your account'
                  : 'Not our member? Sign up'}
              </h2>
            </div>

            <div className='mt-10'>
              <div>{props.children}</div>

              <div className='mt-5'>
                <div className='relative'>
                  <div
                    className='absolute inset-0 flex items-center'
                    aria-hidden='true'
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='lg:flex items-center justify-center relative h-screen hidden w-3/6 flex-1  bg-blue100 bg-opacity-60'>
          <div className=''>
            <Tasks />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthWrapper;
