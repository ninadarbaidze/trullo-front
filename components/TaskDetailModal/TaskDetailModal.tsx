import { ModalWrapper } from 'components/ModalWrapper';
import React, { useRef } from 'react';
import { Props } from './types';
import { NoImage } from 'public/images';
import Image from 'next/image';
import {
  DocumentTextIcon,
  XMarkIcon,
  Square3Stack3DIcon,
  AdjustmentsHorizontalIcon,
  UserGroupIcon,
  TagIcon,
  PhotoIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { TinyMCE, MultipleFileUpload } from 'components';
import { FormProvider } from 'react-hook-form';
import { useTaskDetailModal } from './useTaskDetailModal';

const TaskDetailModal: React.FC<Props> = (props) => {
  const { form, getDescription, onSubmit } = useTaskDetailModal();
  console.log(form.getValues());
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <FormProvider {...form}>
      <ModalWrapper
        setModalIsOpen={props.setTaskDetailsIsOpen}
        modalClass='w-[65%] top-[50%] h-[80vh] overflow-y-scroll'
      >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col gap-6 w-full px-8 py-4 '
        >
          <section>
            <button className='absolute top-2 right-5 z-50' type='button'>
              <XMarkIcon className='bg-blue500 w-8 right-0 text-white rounded-md' />
            </button>

            <div className='flex  overflow-clip max-w-96 h-44 relative rounded-lg object-cover z-10'>
              <Image
                src={NoImage.src}
                // loader={() => getImage()}
                alt='default_profile'
                className='rounded'
                fill
                objectFit='cover'
              />
            </div>
          </section>
          <section className='flex gap-8  w-full'>
            <div className='flex flex-col gap-6 w-3/4'>
              <article>
                <h2 className='text-lg font-semibold'>
                  <input
                    {...form.register('name')}
                    type='text'
                    className='outline-none'
                  />
                </h2>
                <p className='text-xs text-gray-400'>
                  In list{' '}
                  <span className='text-black font-semibold'>In progress</span>
                </p>
              </article>
              <article className='flex flex-col gap-4'>
                <div className='flex text-gray-400 font-medium items-center gap-2 text-xs'>
                  <DocumentTextIcon className='w-4' />
                  Description
                </div>
                <div className='w-full'>
                  <TinyMCE
                    submitTextHandler={getDescription}
                    value={
                      'Ideas are created and share here through a card. Here you can describe what youd like to accomplish.* Why  ? (Why do you wish to do it ?* What ? (What it  is it, what are the goals, who is concerned, Ideas are created and share here through a card. Here you can describe what youd like to accomplish.* Why  ? (Why do you wish to do it ?* What ? (What it  is it, what are the goals, who is concerned Ideas are created and share here through a card. Here you can describe what youd like to accomplish.* Why  ? (Why do you wish to do it ?* What ? (What it  is it, what are the goals, who is concerned'
                    }
                    isInEditMode={true}
                    //   disabled={!isInEditMode}
                    //   isLoading={boardIsLoading}
                  />
                </div>
              </article>
              <article className='flex flex-col gap-4'>
                <div className='flex items-center gap-6'>
                  <div className='flex text-gray-400 font-medium items-center gap-2 text-xs'>
                    <Square3Stack3DIcon className='w-4' />
                    Attachments
                  </div>
                  <button
                    className='flex text-sm border border-gray-400 text-gray-400 rounded-lg px-2 py-1'
                    onClick={() => fileRef.current.click()}
                  >
                    <PlusIcon className='w-4' />
                    Add
                  </button>
                </div>
                <div className='w-full'>
                  <MultipleFileUpload name={`attachments`} fileRef={fileRef} />
                </div>
              </article>
              <article></article>
              <article></article>
            </div>
            <div className='w-1/4'>
              <article className='flex flex-col gap-3'>
                <div className='flex text-gray-400 font-medium items-center gap-2 text-xs'>
                  <AdjustmentsHorizontalIcon className='w-4' />
                  Actions
                </div>
                <nav className='flex flex-col items-start gap-2 w-full text-gray300'>
                  <button className='flex gap-3 items-center px-6 py-2 bg-gray250 rounded-md w-full'>
                    <UserGroupIcon className='w-6' />
                    Members
                  </button>
                  <button className='flex gap-3 items-center px-6 py-2 bg-gray250 rounded-md w-full'>
                    <TagIcon className='w-6' />
                    Label
                  </button>
                  <button className='flex gap-3 items-center px-6 py-2 bg-gray250 rounded-md w-full'>
                    <PhotoIcon className='w-6' />
                    Cover
                  </button>
                </nav>
              </article>
            </div>
          </section>
          <button type='submit'>submit</button>
        </form>
      </ModalWrapper>
    </FormProvider>
  );
};

export default TaskDetailModal;
