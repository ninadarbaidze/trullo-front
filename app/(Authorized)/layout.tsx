'use client';
import {
  BoardButton,
  Logo,
  MenuNavigation,
  NotificationModal,
  UserInfo,
} from 'components';
import { ChevronDownIcon, BellIcon } from '@heroicons/react/24/outline';
import { useParams } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { useEffect, useRef, useState } from 'react';
import { addClickAwayHandler } from 'helpers';
import { useRouter } from 'next/navigation';
import { AuthContextProvider } from 'store';
import { UserProfile, Notification } from 'types/global';
import openSocket from 'socket.io-client';
import { getNotifications } from 'services';

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
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [sumOfNotifications, setSumOfNotifications] = useState(0);
  const [notificationIsOpen, setNotificationIsOpen] = useState(false);

  const getNotificationsHandler = async (userId: number) => {
    try {
      const notifications = await getNotifications(
        getCookie('token') as string,
        userId
      );
      setNotifications(notifications);
      setSumOfNotifications(
        notifications.filter((item) => !item.isRead).length
      );
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    const user = !!getCookie('user') && JSON.parse(getCookie('user') as string);
    const boardName = getCookie('board') as string;
    setUser(user);
    setBoardName(boardName);
    getNotificationsHandler(user?.id);
  }, []);

  const dropDownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const bellRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const toggleDropDown = () => {
    setUserMenuIsOpen((prev) => !prev);
    addClickAwayHandler(triggerRef, dropDownRef, setUserMenuIsOpen);
  };

  const toggleNotification = () => {
    setNotificationIsOpen((prev) => !prev);
    addClickAwayHandler(bellRef, notificationRef, setNotificationIsOpen);
  };

  useEffect(() => {
    const socket = openSocket(`${process.env.NEXT_PUBLIC_BACKEND_URL}`);
    const user = !!getCookie('user') && JSON.parse(getCookie('user') as string);
    socket.on(
      'task',
      (data: { action: string; notifications: Notification[] }) => {
        console.log(data.notifications);
        const userNotification = data.notifications.find(
          (item) => item.receiverId === user?.id
        );
        if (userNotification) {
          setSumOfNotifications((prev) => prev + 1);
          setNotifications((prev) => {
            prev.unshift(userNotification);
            return prev;
          });
        }
        console.log(data);
      }
    );
  }, []);

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
                <BoardButton
                  link={() => router.push('/boards')}
                  buttonText={'All boards'}
                  cubeNumber={3}
                />
              </div>
            )}
          </section>

          <section className='flex justify-end w-1/2 pr-[1%]'>
            <div className='flex items-center justify-between relative gap-3 w-64 cursor-pointer'>
              <div className='relative'>
                {notificationIsOpen && (
                  <NotificationModal
                    notifications={notifications}
                    setNotifications={setNotifications}
                    notificationRef={notificationRef}
                    setSumOfNotifications={setSumOfNotifications}
                    setNotificationIsOpen={setNotificationIsOpen}
                  />
                )}
                <div ref={bellRef} onClick={toggleNotification}>
                  <BellIcon className='w-8' />
                  {sumOfNotifications > 0 && (
                    <div className='flex text-sm items-center justify-center bg-red-600 w-6 h-6 -top-2 -right-1 text-white rounded-full absolute'>
                      {sumOfNotifications}
                    </div>
                  )}
                </div>
              </div>
              {userMenuIsOpen && (
                <div
                  ref={dropDownRef}
                  className='flex flex-col items-start gap-2 px-4 py-2 absolute right-0 top-10 z-50 bg-white border shadow-md rounded-md w-36'
                >
                  <MenuNavigation />
                </div>
              )}
              <div ref={triggerRef} onClick={() => toggleDropDown()}>
                <UserInfo user={user} />
                <ChevronDownIcon className='text-black w-5 absolute top-2 right-0' />
              </div>
            </div>
          </section>
        </header>
        {children}
      </section>
    </AuthContextProvider>
  );
}
