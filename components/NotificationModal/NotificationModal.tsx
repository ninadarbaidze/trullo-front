import { NotificationListItem } from 'components/NotificationListItem';
import React, { RefObject } from 'react';
import { SetState, Notification } from 'types/global';
import { useNotificationModal } from './useNotificationModal';

const NotificationModal: React.FC<{
  notifications: Notification[];
  setNotifications: SetState<Notification[]>;
  notificationRef: RefObject<HTMLDivElement>;
  setSumOfNotifications: SetState<number>;
}> = (props) => {
  const { markAllNotificationsAsSeenHandler, markAsSeenHandler } =
    useNotificationModal(props.setNotifications, props.setSumOfNotifications);
  return (
    <div
      className='absolute flex flex-col w-[28rem] shadow-lg top-10 right-0 bg-white border rounded-md px-6 py-3 h-[30rem] overflow-y-auto overflow-x-clip z-[99999999]'
      ref={props.notificationRef}
    >
      <nav className='flex items-center justify-between pb-5'>
        <h3 className='text-lg font-semibold'>Notifications</h3>
        {props.notifications.some((item) => !item.isRead) && (
          <p
            className='text-sm text-gray-500 hover:underline'
            onClick={markAllNotificationsAsSeenHandler}
          >
            Mark all as seen
          </p>
        )}
      </nav>
      <ul className='flex flex-col gap-4'>
        {props.notifications.length > 0 ? (
          props.notifications?.map((notification) => (
            <NotificationListItem
              notification={notification}
              key={notification.id}
              markAsSeenHandler={markAsSeenHandler}
            />
          ))
        ) : (
          <p className='text-center py-12 text-gray200'>Empty</p>
        )}
      </ul>
    </div>
  );
};

export default NotificationModal;
