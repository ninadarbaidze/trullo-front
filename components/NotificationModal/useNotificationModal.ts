import { getCookie } from 'cookies-next';
import { useContext } from 'react';
import { markAllAsSeen, markAsSeen } from 'services';
import { AuthContext } from 'store';
import { SetState, Notification } from 'types/global';

export const useNotificationModal = (
  setNotifications: SetState<Notification[]>,
  setSumOfNotifications: SetState<number>
) => {
  const token = getCookie('token') as string;
  const { user } = useContext(AuthContext);

  const markAllNotificationsAsSeenHandler = async () => {
    try {
      await markAllAsSeen(token, user?.id!);
      setSumOfNotifications(0);
      setNotifications((prev) => {
        return prev.map((item) => ({ ...item, isRead: true }));
      });
    } catch (err: any) {
      console.error(err);
    }
  };
  const markAsSeenHandler = async (notificationId: number) => {
    try {
      await markAsSeen(token, notificationId);
      setNotifications((prev) => {
        return prev.map((item) =>
          item.id === notificationId ? { ...item, isRead: true } : item
        );
      });
      setSumOfNotifications((prev) => prev - 1);
    } catch (err: any) {
      console.error(err);
    }
  };
  return { markAllNotificationsAsSeenHandler, markAsSeenHandler };
};
