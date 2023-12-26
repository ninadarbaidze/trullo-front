import { SetState, Comment } from 'types/global';

export type Props = {
  comments: Comment[];
  setComments: SetState<Comment[]>;
  taskId: number;
};
