'use client';
import React from 'react';
import { useLoginForm } from './useLoginForm';
import { FormProvider } from 'react-hook-form';

const LoginForm = () => {
  const { onSubmit, form, router } = useLoginForm();

  return (
    <FormProvider {...form}>
      <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor='username'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Username
          </label>
          <div className='mt-2'>
            <input
              {...form.register('username')}
              type='text'
              className='block w-full pl-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        <div>
          <label
            htmlFor='password'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Password
          </label>
          <div className='mt-2'>
            <input
              {...form.register('password')}
              type='password'
              className='block w-full pl-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <input
              {...form.register('remember')}
              type='checkbox'
              className='h-4 w-4  rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
            />
            <label
              htmlFor='remember-me'
              className='ml-3 block text-sm leading-6 text-gray-700'
            >
              Remember me
            </label>
          </div>

          <div className='text-sm leading-6'>
            <a
              href='#'
              className='font-semibold  text-blue500 hover:opacity-90'
            >
              Forgot password?
            </a>
          </div>
        </div>

        <div>
          <button
            type='submit'
            className='flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Log in
          </button>
          <div className='text-xs flex pt-1  justify-center'>
            Do not have an account?{' '}
            <span
              className='pl-1 text-blue-500 cursor-pointer'
              onClick={() => router.push('/user/register')}
            >
              {' '}
              Sign up
            </span>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
