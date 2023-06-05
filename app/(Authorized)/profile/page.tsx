'use client';
import { FormProvider } from 'react-hook-form';
import { FileUploader, SquareLoader } from 'components';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useProfile } from 'app/hooks/useProfile';

const Page = () => {
  const {
    form,
    resetImage,
    previewImage,
    passwordChangeIsOpen,
    setPasswordChangeIsOpen,
    setCustomImage,
    onSubmit,
    imageUrl,
    isInEditMode,
    setIsInEditMode,
    loading,
  } = useProfile();

  return (
    <section className='mt-16 pt-12 pl-8 flex items-center justify-center w-full'>
      <FormProvider {...form}>
        {loading ? (
          <SquareLoader size='w-16 h-16' className='pt-44' />
        ) : (
          <form
            className='flex flex-col items-center justify-center gap-5 w-[80%]'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className='flex flex-col items-center relative'>
              <div className='bg-default bg-cover w-36 h-36 rounded-full overflow-clip shadow'>
                <img src={imageUrl || previewImage} alt='' />
              </div>
              <FileUploader
                name='image'
                setCustomImage={setCustomImage}
                hiddenDropBox={true}
                uploadBtnText={!previewImage ? 'Upload avatar' : ''}
                imageReseted={true}
                disabled={!isInEditMode}
              />
              {previewImage && (
                <button
                  className='absolute top-0 right-24 z-50'
                  type='button'
                  onClick={(e) => resetImage(e as any)}
                >
                  <XMarkIcon className='bg-red-300 w-4 rounded-full text-red-600' />
                </button>
              )}
            </div>
            <div className='w-[40%]'>
              <label htmlFor='username' className='font-medium'>
                Username
              </label>
              <input
                {...form.register('username')}
                id='username'
                type='text'
                className='block w-full pl-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                disabled={!isInEditMode}
              />
            </div>
            <div className='w-[40%]'>
              <label htmlFor='email' className='font-medium'>
                Email
              </label>
              <input
                {...form.register('email')}
                id='email'
                type='email'
                className='block w-full pl-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                disabled={!isInEditMode}
              />
            </div>
            <div className='w-[40%] h-[1px] bg-gray-200 my-3' />
            {passwordChangeIsOpen ? (
              <div className=' flex flex-col gap-6 w-[40%]'>
                <div>
                  <label htmlFor='password' className='font-medium'>
                    New password
                  </label>
                  <input
                    {...form.register('new_password')}
                    id='password'
                    type='password'
                    className='block w-full pl-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    disabled={!isInEditMode}
                  />
                </div>
                <div>
                  <label htmlFor='repeat_password' className='font-medium'>
                    Repeat password
                  </label>
                  <input
                    {...form.register('repeat_password')}
                    id='repeat_password'
                    type='password'
                    className='block w-full pl-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    disabled={!isInEditMode}
                  />
                </div>
              </div>
            ) : (
              <button
                className='text-sm text-blue500'
                type='button'
                onClick={() => {
                  setPasswordChangeIsOpen(true);
                  setIsInEditMode(true);
                }}
              >
                Change password
              </button>
            )}
            {isInEditMode ? (
              <nav className='flex gap-5'>
                <button
                  className='text-zinc-600 px-5 text-sm bg-zinc-300 hover:bg-blue-200 hover:text-blue500 py-2 rounded-md font-medium  transition-all delay-150'
                  type='button'
                  onClick={() => {
                    setPasswordChangeIsOpen(false);
                    setIsInEditMode(false);
                  }}
                >
                  Cancel
                </button>

                <button className='text-white px-8 bg-blue500 hover:bg-blue-200 hover:text-blue500 py-2 rounded-md font-medium  transition-all delay-150'>
                  Save
                </button>
              </nav>
            ) : (
              <button
                className='text-white bg-blue500 hover:bg-blue-200 hover:text-blue500 py-2 rounded-md font-medium w-[40%] transition-all delay-150'
                type='button'
                onClick={() => setIsInEditMode(true)}
              >
                Edit
              </button>
            )}
          </form>
        )}
      </FormProvider>
    </section>
  );
};

export default Page;
