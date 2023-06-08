'use client';
import { AllBoardButton, Logo, MenuNavigation } from 'components';
import Image, { ImageLoader } from 'next/image';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useParams } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { useEffect, useRef, useState } from 'react';
import { addClickAwayHandler, getFirstInitials } from 'helpers';
import { useRouter } from 'next/navigation';
import { AuthContextProvider } from 'store';
import { UserProfile } from 'types/global';

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const router = useRouter();
  const [userMenuIsOpen, setUserMenuIsOpen] = useState(false);
  const [user, setUser] = useState<Partial<UserProfile>>({});
  const [boardName, setBoardName] = useState('');

  useEffect(() => {
    const user = !!getCookie('user') && JSON.parse(getCookie('user') as string);
    const boardName = getCookie('board') as string;

    setUser(user);
    setBoardName(boardName);
  }, []);

  const dropDownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const toggleDropDown = () => {
    setUserMenuIsOpen((prev) => !prev);
    addClickAwayHandler(triggerRef, dropDownRef, setUserMenuIsOpen);
  };

  const getAvatarHandler = () => {
    return (
      user?.avatar && `${process.env.NEXT_PUBLIC_BACKEND_URL}/${user?.avatar}`
    );
  };

  return (
    <AuthContextProvider>
      <section className='flex'>
        <header className='flex items-center justify-between  w-screen h-16 bg-white z-50 shadow-sm fixed px-8'>
          <section className='flex justify-between w-1/2 pr-[10%]'>
            <div
              className='flex items-center gap-2 cursor-pointer'
              onClick={() => router.push('/boards')}
            >
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
            <div
              className='flex items-center justify-between relative gap-3 w-56 cursor-pointer'
              ref={triggerRef}
              onClick={() => toggleDropDown()}
            >
              {userMenuIsOpen && (
                <div
                  ref={dropDownRef}
                  className='flex flex-col items-start gap-2 px-4 py-2 absolute right-0 top-10 z-50 bg-white border shadow-md rounded-md w-36'
                >
                  <MenuNavigation />
                </div>
              )}
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 overflow-clip rounded-lg'>
                  {user?.avatar ? (
                    <Image
                      src={getAvatarHandler() as 'string | StaticImport'}
                      loader={getAvatarHandler as ImageLoader}
                      width={100}
                      height={100}
                      alt='default_profile'
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center bg-gray400 text-white'>
                      {getFirstInitials(user?.firstName, user?.lastName)}
                    </div>
                  )}
                </div>
                <p className='text-sm font-bold truncate w-36'>{`${user?.firstName}  ${user?.lastName}`}</p>
              </div>
              <ChevronDownIcon className='text-black w-5 absolute top-2 right-0' />
            </div>
          </section>
        </header>
        {children}
      </section>
    </AuthContextProvider>
  );
}
