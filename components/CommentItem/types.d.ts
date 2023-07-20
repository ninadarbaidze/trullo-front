import { RefObject } from 'react';
import { Comment } from 'types/global';

export type Props = {
  comment: Comment;
  i: number;
  comments: Comment[];
  textareaRef: RefObject<HTMLTextAreaElement>;
  editComment: (commentId: number, content: string) => void;
  deleteCommentHandler: (commentId: number) => void;
};
