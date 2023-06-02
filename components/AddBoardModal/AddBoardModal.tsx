import { AddButton, ModalWrapper } from 'components';
import React from 'react';
import Image from 'next/image';
import { NoImage } from 'public/images';
import { useAddBoardModal } from './useAddBoardModal';
import { submitOnEnterHandler } from 'helpers';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Props } from './types';

const AddBoardModal: React.FC<Props> = (props) => {
  const { inputValue } = useAddBoardModal();
  return (
    <ModalWrapper>
      <div className='px-6 py-5 items-center relative'>
        <button className='w-7 absolute top-2 right-3 z-40'>
          <XMarkIcon className='text-white bg-blue500 rounded-lg' />
        </button>
        <div className='flex overflow-clip w-96 mb-3 h-32 relative rounded-lg object-cover'>
          <Image
            src={NoImage.src}
            alt='default_profile'
            className='rounded'
            fill
            objectFit='cover'
          />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            props.addNewBoardHandler(inputValue.current!.value);
          }}
          className=''
        >
          <input
            ref={inputValue}
            name='new-column'
            className='bg-white w-full p-2 border  break-all text-xs shadow-md align-top rounded-xl'
            placeholder='Add board title'
            onKeyDown={(e) =>
              submitOnEnterHandler(e, () =>
                props.addNewBoardHandler(inputValue.current!.value)
              )
            }
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
      </div>
    </ModalWrapper>
  );
};

export default AddBoardModal;
