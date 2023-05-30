'use client';
import React from 'react';
import { useLoginForm } from './useLoginForm';
import { FormProvider } from 'react-hook-form';

const LoginForm = () => {
  const { onSubmit, form } = useLoginForm();
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
              className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
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
              className='block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <input
              id='remember-me'
              name='remember-me'
              type='checkbox'
              className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
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
              className='font-semibold text-indigo-600 hover:text-indigo-500'
            >
              Forgot password?
            </a>
          </div>
        </div>

        <div>
          <button
            type='submit'
            className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Sign in
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
