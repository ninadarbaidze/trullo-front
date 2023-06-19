import { RefObject } from 'react';
import { Boards, UserProfile } from 'types/global';
import { NoImage } from 'public/images';

export const submitOnEnterHandler = (
  e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>,
  cb: () => void
) => {
  if (e.keyCode == 13 && e.shiftKey == false) {
    e.preventDefault();
    cb();
  }
};

export const addClickAwayHandler = (
  triggerRef: RefObject<any>,
  dropdownRef: RefObject<any>,
  setIsOpen: (isOpen: boolean) => void
) => {
  const clickAwayHandler = (e: MouseEvent) => {
    if (triggerRef.current?.contains(e.target)) {
      return;
    }
    if (dropdownRef.current && !dropdownRef?.current.contains(e.target)) {
      if ((e.composedPath()[0] as HTMLDivElement).id === 'clear-all-button') {
        (e.composedPath()[0] as HTMLDivElement).click &&
          (e.composedPath()[0] as HTMLDivElement).click();
      }
      setIsOpen(false);

      document.removeEventListener('mousedown', clickAwayHandler);
    }
  };
  document.addEventListener('mousedown', clickAwayHandler);
};

export const getAvatarHandler = (user: Partial<UserProfile>) => {
  return (
    user?.avatar && `${process.env.NEXT_PUBLIC_BACKEND_URL}/${user?.avatar}`
  );
};

export const getFormattedDate = (date: string | number) => {
  const currentDate = new Date(date);
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString('en-US', { month: 'short' });
  const year = currentDate.getFullYear();
  return `${day} ${month}, ${year}`;
};

export const getImage = (board: Boards) => {
  if (board?.image) {
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/${board.image}`;
  } else return NoImage.src;
};
