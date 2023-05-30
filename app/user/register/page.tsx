'use client';
import { AuthWrapper, RegisterForm } from 'components';

const Login = () => {
  return (
    <AuthWrapper type={'register'}>
      <RegisterForm />
    </AuthWrapper>
  );
};

export default Login;
