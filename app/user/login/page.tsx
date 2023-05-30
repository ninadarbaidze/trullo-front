'use client';
import { AuthWrapper, LoginForm } from 'components';
import React from 'react';

const page = () => {
  return (
    <AuthWrapper type={'login'}>
      <LoginForm />
    </AuthWrapper>
  );
};

export default page;
