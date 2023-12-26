import { AddButton, FileUploader, ModalWrapper } from 'components';
import React from 'react';
import Image from 'next/image';
import { NoImage } from 'public/images';
import { useAddBoardModal } from './useAddBoardModal';
import { Props } from './types';
import { FormProvider } from 'react-hook-form';

const AddBoardModal: React.FC<Props> = (props) => {
  const { form, previewImage, setCustomImage } = useAddBoardModal();

  return (
    <ModalWrapper>
      <div className='px-6 py-5 items-center relative'>
        <div className='flex overflow-clip w-96 mb-3 h-32 relative rounded-lg object-cover'>
          <Image
            src={previewImage || NoImage.src}
            alt='default_profile'
            className='rounded'
            fill
            objectFit='cover'
          />
        </div>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(props.addNewBoardHandler)}
            className=''
          >
            <div>
              <FileUploader
                name={'image'}
                boxClassName='w-full mb-4'
                setCustomImage={setCustomImage}
              />
            </div>
            <input
              {...form.register('name')}
              className='bg-white w-full p-2 border  break-all text-xs shadow-md align-top rounded-xl'
              placeholder='Add board title'
            />
            <nav className='flex gap-2 justify-end mt-3'>
              <button
                className='text-gray300 text-xs'
                type='button'
                onClick={props.closeModalHandler}
              >
                Cancel
              </button>
              <AddButton text='Create' className='text-xs' />
            </nav>
          </form>
        </FormProvider>
      </div>
    </ModalWrapper>
  );
};

export default AddBoardModal;
