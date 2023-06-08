import { AllUser } from 'types/global';

export type Props = {
  sendBoardInviteHandler?: (list: AllUser[]) => void;
  list: AllUser[];
  usersIsLoading?: boolean;
};
