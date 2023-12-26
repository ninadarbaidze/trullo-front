import { getCookie } from 'cookies-next';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useCallback, useContext } from 'react';
import { markAllAsSeen, markAsSeen } from 'services';
import { AuthContext } from 'store';
import { SetState, Notification } from 'types/global';

export const useNotificationModal = (
  setNotifications: SetState<Notification[]>,
  setSumOfNotifications: SetState<number>,
  setNotificationIsOpen: SetState<boolean>
) => {
  const token = getCookie('token') as string;
  const { user } = useContext(AuthContext);

  const searchParams = useSearchParams();

  const pathname = usePathname();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const router = useRouter();

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
  const markAsSeenHandler = async (
    notificationId: number,
    taskId: number,
    isRead: boolean
  ) => {
    try {
      router.push(pathname + '?' + createQueryString('task_id', `${taskId}`));
      await markAsSeen(token, notificationId);
      setNotifications((prev) => {
        return prev.map((item) =>
          item.id === notificationId ? { ...item, isRead: true } : item
        );
      });
      !isRead && setSumOfNotifications((prev) => prev - 1);
      setNotificationIsOpen(false);
    } catch (err: any) {
      console.error(err);
    }
  };
  return { markAllNotificationsAsSeenHandler, markAsSeenHandler };
};
