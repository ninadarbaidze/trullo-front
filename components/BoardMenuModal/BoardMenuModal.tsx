'use client';
import { useBoardMenuModal } from './useBoardMenuModal';
import {
  XMarkIcon,
  UserCircleIcon,
  DocumentTextIcon,
  UserGroupIcon,
  PhotoIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import { FileUploader, TinyMCE, UserInfo } from 'components';
import { SetState, UserProfile } from 'types/global';
import { getFormattedDate } from 'helpers';
import { FormProvider } from 'react-hook-form';
import Image from 'next/image';

const BoardMenuModal: React.FC<{ setBoardMenu: SetState<boolean> }> = (
  props
) => {
  const {
    boardDetail,
    deleteUserFromBoardHandler,
    getDescription,
    form,
    boardCover,
    setBoardCover,
    onSubmit,
    isInEditMode,
    setIsInEdiMode,
    getImage,
    canUpdateBoard,
  } = useBoardMenuModal();

  return (
    <FormProvider {...form}>
      <form
        className='flex flex-col bg-white shadow-md fixed top-16 right-0 w-[30%] z-[45] px-4 pb-24  h-full overflow-y-scroll'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <article className='flex w-full items-center justify-between  border-b-2 sticky py-4 top-0 bg-white'>
          <h2 className='text-base font-semibold capitalize'>
            {boardDetail?.name} board
          </h2>
          <XMarkIcon
            className='w-6 cursor-pointer'
            onClick={() => props.setBoardMenu(false)}
          />
        </article>
        <div className='flex flex-col gap-5 mt-4'>
          <article className='flex flex-col gap-4 mb-4'>
            <div className='flex text-gray400 font-medium items-center gap-2 text-xs'>
              <UserCircleIcon className='w-4' />
              Made by
            </div>
            <div className='w-full h-10 overflow-clip rounded-lg'>
              <UserInfo
                user={boardDetail?.boardOwner as UserProfile}
                additionalText={`on ${getFormattedDate(
                  boardDetail?.createdAt
                )}`}
              />
            </div>
          </article>

          <article className='flex flex-col gap-4 mb-4'>
            <div className='flex text-gray400 font-medium items-center gap-2 text-xs'>
              <PhotoIcon className='w-4' />
              Image
            </div>

            <div className='relative'>
              {isInEditMode && !boardCover ? (
                <div className='w-full h-20 overflow-clip rounded-lg'>
                  <FileUploader
                    name={'image'}
                    boxClassName='w-full mb-4 h-full'
                  />
                </div>
              ) : (
                <>
                  {isInEditMode && (
                    <button
                      className='absolute -top-2 right-2 z-50'
                      onClick={() => {
                        setBoardCover('');
                        form.setValue('image', '');
                      }}
                      type='button'
                    >
                      <XMarkIcon className='bg-blue500 w-8 right-0 text-white rounded-md' />
                    </button>
                  )}
                  <div className='flex  overflow-clip max-w-96 h-44 relative rounded-lg object-cover z-10'>
                    <Image
                      src={getImage()}
                      loader={() => getImage()}
                      alt='default_profile'
                      className='rounded'
                      fill
                      objectFit='cover'
                    />
                  </div>
                </>
              )}
            </div>
          </article>
          {isInEditMode && (
            <article className='flex flex-col gap-4 mb-4'>
              <div className='flex text-gray400 font-medium items-center gap-2 text-xs'>
                <PencilIcon className='w-4' />
                Name
              </div>
              <div className='w-full h-10 overflow-clip rounded-lg'>
                <input
                  {...form.register('name')}
                  className={`border-b outline-none w-full`}
                  type='text'
                  disabled={!isInEditMode}
                />
              </div>
            </article>
          )}

          <article className='flex flex-col gap-4'>
            <div className='flex text-gray400 font-medium items-center gap-2 text-xs'>
              <DocumentTextIcon className='w-4' />
              Description
            </div>
            <div className='w-full   '>
              <TinyMCE
                submitTextHandler={getDescription}
                value={boardDetail?.description}
                isInEditMode={true}
                disabled={!isInEditMode}
              />
            </div>
          </article>
          <article className='flex flex-col gap-4'>
            <div className='flex text-gray400 font-medium items-center gap-2  text-xs'>
              <UserGroupIcon className='w-4' />
              Team
            </div>
            <ul className='flex flex-col gap-4'>
              <li className='flex items-center justify-between'>
                <UserInfo user={boardDetail?.boardOwner as UserProfile} />
                <p className='text-sm text-gray-400'>Admin</p>
              </li>
              {boardDetail?.users
                .filter((user) => user.id !== boardDetail.boardOwnerId)
                .map((user) => (
                  <li
                    key={user.id}
                    className='flex justify-between items-center'
                  >
                    <UserInfo user={user} />
                    {canUpdateBoard && (
                      <button
                        className='text-sm text-red-500 border rounded-lg border-red-500 px-4 h-8'
                        onClick={() => deleteUserFromBoardHandler(user.id)}
                        type='button'
                      >
                        Remove
                      </button>
                    )}
                  </li>
                ))}
            </ul>
          </article>
        </div>
        <nav className='flex justify-end gap-3 pt-6'>
          {canUpdateBoard &&
            (isInEditMode ? (
              <>
                <button className='text-white bg-green-600 rounded-xl px-3 py-1'>
                  Save
                </button>
                <button
                  className='text-gray-400'
                  onClick={() => setIsInEdiMode(false)}
                >
                  cancel
                </button>
              </>
            ) : (
              <div
                className='bg-blue500 text-white px-3 py-1 rounded-xl cursor-pointer'
                onClick={() => setIsInEdiMode(true)}
              >
                Edit board
              </div>
            ))}
        </nav>
      </form>
    </FormProvider>
  );
};

export default BoardMenuModal;
