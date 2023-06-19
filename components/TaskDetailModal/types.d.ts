import { SetState } from 'types/global';

export type Props = {
  setTaskDetailsIsOpen: SetState<boolean>;
  taskId: number;
  boardUsers: UserProfile[];
};
