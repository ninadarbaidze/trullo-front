import { deleteCookie } from 'cookies-next';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

export const getCookie = (name: string) => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
};

export const logOutHandler = (router: AppRouterInstance) => {
  router.push('/user/login');
  deleteCookie('token');
  deleteCookie('user');
  deleteCookie('board');
};

export const getFirstInitials = (
  first: string | undefined,
  last: string | undefined
) => {
  return ((first?.charAt(0).toUpperCase() as string) +
    last?.charAt(0).toUpperCase()) as string;
};

export const firstTwoChars = (name: string) => {
  return name.substring(0, 2);
};
