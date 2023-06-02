'use client';
import { AllBoardButton, Logo } from 'components';
import { Profile } from 'public/images';
import Image from 'next/image';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useParams } from 'next/navigation';
import { getCookie } from 'cookies-next';

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = JSON.parse(getCookie('user') as string);
  const boardName = getCookie('board');
  const params = useParams();

  return (
    <section className='flex'>
      <header className='flex items-center justify-between  w-screen h-16 bg-white shadow-sm fixed px-8'>
        <section className='flex justify-between w-1/2 pr-[10%]'>
          <div className='flex items-center gap-2'>
            <Logo />
            <p className='text-lg font-semibold'>Thullo</p>
          </div>
          {params.id && (
            <div className='flex items-center gap-5'>
              <h2 className='text-lg font-medium capitalize'>
                {boardName} Board
              </h2>
              <span className='w-[1px] h-8 bg-gray200'></span>
              <AllBoardButton link='/boards' />
            </div>
          )}
        </section>
        <section className='flex justify-between  w-1/2 pr-[1%]'>
          <div></div>
          <div className='flex items-center justify-between relative gap-3 w-44'>
            <div className='flex items-center gap-3 '>
              <div className='w-10'>
                <Image
                  src={user.avatar ?? Profile.src}
                  width={100}
                  height={100}
                  alt='default_profile'
                  className='rounded'
                />
              </div>
              <p className='text-sm font-bold truncate w-20'>{user.name}</p>
            </div>
            <ChevronDownIcon className='text-black w-5 absolute top-2 right-0' />
          </div>
        </section>
      </header>
      {children}
    </section>
  );
}
