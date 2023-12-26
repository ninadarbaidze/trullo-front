'use client';
import React from 'react';
import { useRegisterForm } from './useRegisterForm';
import { FormProvider } from 'react-hook-form';

const RegisterForm = () => {
  const { onSubmit, form, router } = useRegisterForm();
  return (
    <FormProvider {...form}>
      <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <label className='block text-sm font-medium leading-6 text-gray-900'>
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
          <label className='block text-sm font-medium leading-6 text-gray-900'>
            Email address
          </label>
          <div className='mt-2'>
            <input
              {...form.register('email')}
              type='email'
              className='block w-full pl-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>
        <div>
          <label className='block text-sm font-medium leading-6 text-gray-900'>
            First name
          </label>
          <div className='mt-2'>
            <input
              {...form.register('firstName')}
              type='text'
              className='block w-full pl-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>
        <div>
          <label className='block text-sm font-medium leading-6 text-gray-900'>
            Last name
          </label>
          <div className='mt-2'>
            <input
              {...form.register('lastName')}
              type='string'
              className='block w-full pl-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        <div>
          <label
            htmlFor='password'
            className='block text-sm pl-2 font-medium leading-6 text-gray-900'
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

        <div>
          <label
            htmlFor='repeat-password'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Repeat password
          </label>
          <div className='mt-2'>
            <input
              {...form.register('repeat_password')}
              type='password'
              className='block w-full pl-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        <div>
          <button
            type='submit'
            className='flex w-full justify-center rounded-md bg-blue500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Sign up
          </button>
          <div className='text-xs flex pt-1  justify-center'>
            Already have an account?{' '}
            <span
              className='pl-1 text-blue-500 cursor-pointer'
              onClick={() => router.push('/user/login')}
            >
              {' '}
              Log in
            </span>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
