import React from 'react';
import { Props } from './types';
import { useRouter } from 'next/navigation';

const InformationModal: React.FC<Props> = (props) => {
  const router = useRouter();
  return (
    <div className='relative z-10'>
      <div>
        <div className='fixed inset-0 bg-blue500 bg-opacity-10 transition-opacity' />
      </div>

      <div className='fixed inset-0 z-10 overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <div>
            <div className='relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6'>
              <div>
                {props.children}

                <div className='mt-3 text-center sm:mt-5'>
                  <div className='flex text-base font-semibold leading-6 px-12 w-full text-gray-900'>
                    {props.title}
                  </div>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>{props.paragraph}</p>
                  </div>
                </div>
              </div>
              {props.buttonText && (
                <div className='mt-5 sm:mt-6'>
                  <button
                    type='button'
                    className='inline-flex w-full justify-center rounded-md bg-blue500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    onClick={() => router.push(props.buttonUrl as string)}
                  >
                    {props.buttonText}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationModal;
