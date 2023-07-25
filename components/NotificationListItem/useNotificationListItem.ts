export const useNotificationListItem = () => {
  const getNotificationText = (type: string) => {
    switch (type) {
      case 'comment':
        return 'commented on the task you are assigned';
    }
  };
  return { getNotificationText };
};
