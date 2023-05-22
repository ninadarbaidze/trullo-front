import { RefObject } from 'react';

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
