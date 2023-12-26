import { AddButton, BoardButton, BoardUserList, Select } from 'components';
import React from 'react';
import { Props } from './types';

const BoardHeader: React.FC<Props> = (props) => {
  return (
    <nav className='flex w-screen fixed top-[4rem] px-8 pt-5 justify-between bg-white z-40'>
      <ul className='flex gap-2 mb-4'>
        <BoardUserList users={props.data.users} />
        <AddButton
          className='h-8 w-8 flex !items-center !justify-center'
          onclick={() => props.getAllUserData()}
        />
        {props.invitationModalIsOpen && (
          <>
            <div
              className='fixed top-0 left-0 w-screen h-screen z-30'
              onClick={() => props.setInvitationModalIsOpen(false)}
            />
            <Select
              list={props.allUsers}
              usersIsLoading={props.usersIsLoading}
              sendBoardInviteHandler={props.sendBoardInviteHandler}
              description='Invite members to this board'
              btnText='Invite'
            />
          </>
        )}
      </ul>
      <BoardButton
        link={() => props.setBoardMenu(true)}
        buttonText={'Menu'}
        cubeBorderStyle='rounded-full w-[5px] h-[5px]'
      />
    </nav>
  );
};

export default BoardHeader;
