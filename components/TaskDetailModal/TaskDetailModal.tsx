import { ModalWrapper } from 'components/ModalWrapper';
import { Props } from './types';
import Image from 'next/image';
import {
  DocumentTextIcon,
  XMarkIcon,
  Square3Stack3DIcon,
  AdjustmentsHorizontalIcon,
  UserGroupIcon,
  TagIcon,
  PhotoIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
import { TinyMCE, MultipleFileUpload, FileUploader, Button } from 'components';
import { FormProvider } from 'react-hook-form';
import { useTaskDetailModal } from './useTaskDetailModal';

const TaskDetailModal: React.FC<Props> = (props) => {
  const {
    form,
    getDescription,
    onSubmit,
    fileRef,
    getImage,
    setCustomImage,
    resetTaskImage,
    taskData,
    submitImages,
    setEditState,
    isInEditMode,
    submitImageHandler,
  } = useTaskDetailModal(props.taskId);

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
            {form.getValues('image') && (
              <button
                className='absolute top-2 right-5 z-50'
                type='button'
                onClick={resetTaskImage}
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
          </section>
          <section className='flex gap-8  w-full'>
            <div className='flex flex-col gap-6 w-3/4'>
              <article>
                <h2 className='flex items-center justify-between text-lg font-semibold'>
                  <input
                    {...form.register('name')}
                    type='text'
                    className='outline-none'
                    disabled={!isInEditMode.name}
                  />
                  {isInEditMode.name ? (
                    <nav className='flex gap-1'>
                      <button
                        type='button'
                        onClick={() => {
                          setEditState('name');
                          onSubmit(form.getValues());
                        }}
                      >
                        <CheckIcon className='text-white bg-blue500 w-5 rounded-full z-20' />
                      </button>
                      <button onClick={() => setEditState('name')}>
                        <XMarkIcon className='text-white bg-red-500 w-5 rounded-full z-20' />
                      </button>
                    </nav>
                  ) : (
                    <Button
                      text={'Edit'}
                      icon={'edit'}
                      onClick={() => setEditState('name')}
                      classNme='text-xs px-1'
                    />
                  )}
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
                  {isInEditMode.description ? (
                    <nav className='flex gap-1'>
                      <button
                        onClick={() => {
                          setEditState('desc');
                          onSubmit(form.getValues());
                        }}
                      >
                        <CheckIcon className='text-white bg-blue500 w-5 rounded-full z-20' />
                      </button>
                      <button onClick={() => setEditState('desc')}>
                        <XMarkIcon className='text-white bg-red-500 w-5 rounded-full z-20' />
                      </button>
                    </nav>
                  ) : (
                    <Button
                      text={'Edit'}
                      icon={'edit'}
                      onClick={() => setEditState('desc')}
                      classNme='text-xs px-1'
                    />
                  )}
                </div>
                <div className='w-full text-xs'>
                  <TinyMCE
                    submitTextHandler={getDescription}
                    value={taskData?.description.content}
                    isInEditMode={true}
                    disabled={!isInEditMode.description}
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

                  <Button
                    text={'Add'}
                    icon={'plus'}
                    onClick={() => fileRef.current!.click()}
                  />
                </div>
                <div className='w-full'>
                  <MultipleFileUpload
                    name={`attachments`}
                    fileRef={fileRef}
                    submitImages={submitImages}
                  />
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
                  <button className='flex gap-2 items-center justify-start px-4 py-2 bg-gray250 rounded-md w-full'>
                    <UserGroupIcon className='w-5' />
                    Members
                  </button>
                  <button className='flex gap-2 items-center justify-start px-4 py-2 bg-gray250 rounded-md w-full'>
                    <TagIcon className='w-5' />
                    Label
                  </button>
                  <button
                    className='flex gap-2 relative items-center px-4 py-2 bg-gray250 rounded-md w-full'
                    type='button'
                  >
                    <PhotoIcon className='w-5' />
                    Cover
                    <FileUploader
                      name='image'
                      hiddenDropBox={true}
                      boxClassName='absolute top-0 left-0 !h-10 w-full'
                      setCustomImage={setCustomImage}
                      submitImage={submitImageHandler}
                    />
                  </button>
                </nav>
              </article>
            </div>
          </section>
        </form>
      </ModalWrapper>
    </FormProvider>
  );
};

export default TaskDetailModal;
