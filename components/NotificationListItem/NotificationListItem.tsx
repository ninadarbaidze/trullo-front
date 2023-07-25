import { UserInfo } from 'components';
import React from 'react';
import { Notification } from 'types/global';
import { useNotificationListItem } from './useNotificationListItem';
import * as timeago from 'timeago.js';
import { ChatBubbleLeftIcon, UserPlusIcon } from '@heroicons/react/24/outline';

const NotificationListItem: React.FC<{
  notification: Notification;
  key: number;
  markAsSeenHandler: (
    notificationId: number,
    taskId: number,
    isRead: boolean
  ) => void;
}> = (props) => {
  const { getNotificationText } = useNotificationListItem();
  return (
    <li
      key={props.key}
      className='flex items-start w-96 text-sm'
      onClick={() =>
        props.markAsSeenHandler(
          props.notification.id,
          props.notification.taskId,
          props.notification.isRead
        )
      }
    >
      <div id='not_user' className='flex w-full gap-2 relative'>
        <UserInfo
          user={props.notification.sender}
          hideName={true}
          imageSize='w-12 h-12'
        />
        <div className='absolute bottom-0 left-8'>
          {props.notification.type === 'comment' ? (
            <ChatBubbleLeftIcon className='bg-green-600 text-white p-[2px] rounded-full w-5 h-5' />
          ) : (
            <UserPlusIcon className='bg-blue500 text-white p-[2px] rounded-full w-5 h-5' />
          )}
        </div>
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
