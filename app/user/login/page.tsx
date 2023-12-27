'use client';
import { AuthWrapper, LoginForm } from 'components';
import Head from 'next/head';
import React from 'react';

const page = () => {
  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <title>Trullo - Login</title>
        <meta name='description' content='' />
        <meta name='robots' content='all' />
      </Head>
      <AuthWrapper type={'login'}>
        <LoginForm />
      </AuthWrapper>
    </>
  );
};

export default page;
