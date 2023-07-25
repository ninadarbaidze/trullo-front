import { UserInfo } from 'components/UserInfo';
import React from 'react';
import { Notification } from 'types/global';
import { useNotificationListItem } from './useNotificationListItem';
import * as timeago from 'timeago.js';

const NotificationListItem: React.FC<{
  notification: Notification;
  key: number;
  markAsSeenHandler: (notificationId: number) => void;
}> = (props) => {
  const { getNotificationText } = useNotificationListItem();
  return (
    <li
      key={props.key}
      className='flex items-start w-96 text-sm'
      onClick={() =>
        props.notification.isRead === false &&
        props.markAsSeenHandler(props.notification.id)
      }
    >
      <div id='not_user' className='flex w-full gap-2'>
        <UserInfo
          user={props.notification.sender}
          hideName={true}
          imageSize='w-12 h-12'
        />
        <div>
          <p className='w-full'>
            <span className='font-semibold capitalize'>{`${props.notification.sender?.firstName} ${props.notification.sender?.lastName} `}</span>
            <span
              className={`${props.notification.isRead ? '' : 'font-semibold'} `}
            >
              {`${getNotificationText(props.notification.type)}`}
            </span>
          </p>
          <p className={`text-xs text-gray300`}>
            {timeago.format(props.notification.createdAt)}
          </p>
        </div>
      </div>
      {!props.notification.isRead && (
        <div className='w-2 h-2 mt-1 bg-blue500 rounded-full' />
      )}
    </li>
  );
};

export default NotificationListItem;
