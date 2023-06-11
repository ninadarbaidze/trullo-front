'use client';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useMain } from '../../../hooks';
import { submitOnEnterHandler } from 'helpers';
import {
  BoardSkeleton,
  X,
  Column,
  BoardHeader,
  BoardMenuModal,
} from 'components';

export default function Home() {
  const {
    data,
    onDragEnd,
    submitColumnHandler,
    addMoreTasks,
    onDragUpdate,
    placeholderProps,
    columnInputIsOpen,
    setColumnInputIsOpen,
    deleteTaskHandler,
    inputValue,
    deleteColumnHandler,
    changeColumnNameHandler,
    isLoading,
    openBoardMenu,
    setBoardMenu,
    getAllUserData,
    allUsers,
    usersIsLoading,
    invitationModalIsOpen,
    setInvitationModalIsOpen,
    sendBoardInviteHandler,
  } = useMain();

  return (
    <>
      <BoardHeader
        data={data}
        getAllUserData={getAllUserData}
        invitationModalIsOpen={invitationModalIsOpen}
        setInvitationModalIsOpen={setInvitationModalIsOpen}
        allUsers={allUsers}
        usersIsLoading={usersIsLoading}
        sendBoardInviteHandler={sendBoardInviteHandler}
        setBoardMenu={setBoardMenu}
      />
      {openBoardMenu && <BoardMenuModal setBoardMenu={setBoardMenu} />}
      {isLoading ? (
        <BoardSkeleton />
      ) : (
        <div className='flex flex-col py-[9rem]  text-black  px-8'>
          <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
            <Droppable
              droppableId='all-columns'
              direction='horizontal'
              type='column'
            >
              {(provided) => (
                <ul
                  className='flex bg-babyBlue rounded-xl full'
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <>
                    {data?.columnOrder?.map(
                      (columnId: string, index: number) => {
                        const column = data?.columns[columnId];
                        const tasks = column?.taskIds?.map(
                          (taskId) => data?.tasks[taskId]
                        );
                        return (
                          <Column
                            key={column.id}
                            column={column}
                            tasks={tasks}
                            index={index}
                            addMoreTasks={addMoreTasks}
                            placeholderProps={placeholderProps}
                            deleteTaskHandler={deleteTaskHandler}
                            deleteColumnHandler={deleteColumnHandler}
                            changeColumnNameHandler={changeColumnNameHandler}
                          />
                        );
                      }
                    )}
                    {provided.placeholder}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        submitColumnHandler();
                      }}
                      className='p-5 w-56'
                    >
                      {columnInputIsOpen ? (
                        <div className='flex flex-col gap-2'>
                          <input
                            ref={inputValue}
                            name='new-column'
                            className='bg-white w-full p-2  break-all text-xs shadow-md align-top rounded-xl'
                            placeholder='Enter list title..'
                            onKeyDown={(e) =>
                              submitOnEnterHandler(e, submitColumnHandler)
                            }
                          />
                          <nav className='flex gap-1'>
                            <button
                              className='bg-blue500 text-white px-2 py-1 text-xs rounded-md'
                              type='submit'
                            >
                              Add list
                            </button>
                            <button
                              className='hover:opacity-40'
                              onClick={() => setColumnInputIsOpen(false)}
                            >
                              <X pathClassName='fill-gray-500' />
                            </button>
                          </nav>
                        </div>
                      ) : (
                        <div
                          className='flex items-center  justify-between bg-blue200 rounded-lg px-2 text-xs text-blue500  cursor-pointer'
                          onClick={() => setColumnInputIsOpen(true)}
                        >
                          <p className='cursor-pointer'>Add another list</p>
                          <button type='button' className='text-lg'>
                            +
                          </button>
                        </div>
                      )}{' '}
                    </form>
                  </>
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      )}
    </>
  );
}
