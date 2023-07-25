import { Notification } from 'types/global';

export type Props = {
  notifications: Notification[];
  setNotifications: SetState<Notification[]>;
  notificationRef: RefObject<HTMLDivElement>;
  setSumOfNotifications: SetState<number>;
  setNotificationIsOpen: SetState<boolean>;
};
