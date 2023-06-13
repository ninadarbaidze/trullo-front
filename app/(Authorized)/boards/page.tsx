'use client';
import React from 'react';
import { useBoards } from 'app/hooks/useBoards';
import Image from 'next/image';
import { AddBoardModal, AddButton, SquareLoader } from 'components';
import { getFirstInitials, getImage } from 'helpers';

const Boards = () => {
  const {
    boards,
    router,
    addModalIsOpen,
    setAddModalIsOpen,
    addNewBoardHandler,
    closeModalHandler,
    isLoading,
    numberOfEmployeesToShow,
  } = useBoards();

  return (
    <>
      {addModalIsOpen && (
        <AddBoardModal
          addNewBoardHandler={addNewBoardHandler}
          closeModalHandler={closeModalHandler}
        />
      )}

      <div className='flex flex-col mt-16 pt-12 h-screen w-full px-36  bg-babyBlue'>
        <section className='flex flex-row justify-between w-full mb-5'>
          <h1 className='text-lg font-medium'>All boards</h1>

          <AddButton text='add' onclick={() => setAddModalIsOpen(true)} />
        </section>
        {isLoading ? (
          <SquareLoader size='w-16 h-16' className='pt-44 ' />
        ) : (
          <ul className='grid grid-flow-row grid-cols-2  xl:grid-cols-4 gap-6'>
            {boards.map((board) => (
              <li
                key={board.id}
                className=' col-span-1 bg-white  py-3 rounded-xl shadow-md cursor-pointer px-5'
                onClick={() => router.push(`/boards/${board.id}`)}
              >
                <div className='flex  overflow-clip max-w-96 h-48 relative rounded-lg object-cover z-10'>
                  <Image
                    src={getImage(board)}
                    loader={() => getImage(board)}
                    alt='default_profile'
                    className='rounded'
                    fill
                    objectFit='cover'
                  />
                </div>
                <p className='text-lg py-2 font-medium'>{board.name}</p>
                <ul className='flex items-center gap-2 my-4 relative'>
                  {board.users.slice(0, numberOfEmployeesToShow).map((user) =>
                    user.avatar ? (
                      <li
                        className='w-8 h-8 overflow-clip rounded-lg'
                        key={user.id}
                      >
                        <Image
                          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${user?.avatar}`}
                          loader={() =>
                            `${process.env.NEXT_PUBLIC_BACKEND_URL}/${user?.avatar}`
                          }
                          width={100}
                          height={100}
                          alt=''
                        />
                      </li>
                    ) : (
                      <li
                        key={user.id}
                        className='w-8 h-8 rounded-md flex items-center justify-center bg-gray400 text-white'
                      >
                        {getFirstInitials(user?.firstName, user?.lastName)}
                      </li>
                    )
                  )}
                  <p className='text-xs text-gray300'>
                    {board.users.length > numberOfEmployeesToShow &&
                      `+${board.users.length - numberOfEmployeesToShow} other`}
                  </p>
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Boards;
