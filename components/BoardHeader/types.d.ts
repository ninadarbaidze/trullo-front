import { AllUser, SetState } from 'types/global';

export type Props = {
  data: Board;
  getAllUserData: () => void;
  invitationModalIsOpen: boolean;
  setInvitationModalIsOpen: SetState<boolean>;
  allUsers: AllUser[];
  usersIsLoading: boolean;
  sendBoardInviteHandler: (data: AllUser[]) => void;
  setBoardMenu: SetState<boolean>;
};
