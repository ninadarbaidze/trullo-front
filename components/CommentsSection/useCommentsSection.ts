import { getCookie } from 'cookies-next';
import { useContext, useRef } from 'react';
import { addComment, deleteComment, patchComment } from 'services';
import { AuthContext } from 'store';
import { SetState, Comment } from 'types/global';

export const useCommentsSection = (
  comments: Comment[],
  setComments: SetState<Comment[]>,
  taskId: number
) => {
  const { user } = useContext(AuthContext);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const token = getCookie('token') as string;

  const addNewComment = async () => {
    try {
      const newComment = {
        content: textareaRef?.current!.value,
        taskId,
        user,
        userId: user?.id as number,
        createdAt: new Date(),
      } as Comment;

      const response = await addComment(token, taskId, {
        content: textareaRef?.current!.value,
        userId: user?.id as number,
      });
      setComments((prev) => {
        return [{ ...newComment, id: response.id }, ...prev];
      });
      textareaRef.current!.value = '';
    } catch (err: any) {
      console.error(err);
    }
  };

  const editComment = async (commentId: number, content: string) => {
    try {
      await patchComment(token, { content, commentId });
      setComments((prev) => {
        const newState = [...prev];
        const existingComment = newState.find((item) => item.id === commentId);
        if (existingComment) existingComment.content = content;
        return newState;
      });
    } catch (err: any) {
      console.error(err);
    }
  };

  const deleteCommentHandler = async (commentId: number) => {
    try {
      await deleteComment(token, commentId);
      setComments((prev) => {
        const newState = [...prev];
        return newState.filter((comment) => comment.id !== commentId);
      });
    } catch (err: any) {
      console.error(err);
    }
  };
  return {
    user,
    textareaRef,
    addNewComment,
    editComment,
    deleteCommentHandler,
  };
};
