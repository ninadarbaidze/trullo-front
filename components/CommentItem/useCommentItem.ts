import { useContext, useRef, useState } from 'react';
import { AuthContext } from 'store';

export const useCommentItem = () => {
  const [isInEditMode, setIsInEditMode] = useState(false);

  const { user } = useContext(AuthContext);

  const textAreaEditRef = useRef<HTMLTextAreaElement>(null);

  return { isInEditMode, setIsInEditMode, textAreaEditRef, user };
};
