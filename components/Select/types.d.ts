import { AllUser, UserProfile } from 'types/global';

export type Props = {
  sendBoardInviteHandler?: (list: AllUser[]) => void;
  list: AllUser[] | UserProfile[];
  usersIsLoading?: boolean;
  className?: string;
  description: string;
  btnText: string;
};
