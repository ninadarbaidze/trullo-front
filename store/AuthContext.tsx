import { getCookie } from 'cookies-next';
import React, { createContext } from 'react';

export const AuthContext = createContext({
  user: {
    id: null,
    avatar: '',
    name: '',
  },
  board: '',
});

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = (
  props
) => {
  const user = getCookie('user') && JSON.parse(getCookie('user') as string);
  const boardName = getCookie('board') as string;
  const initialContext = {
    user: {
      id: user?.id,
      avatar: user?.avatar,
      name: user?.name,
    },
    board: boardName,
  };

  return (
    <AuthContext.Provider value={initialContext}>
      {props.children}
    </AuthContext.Provider>
  );
};
