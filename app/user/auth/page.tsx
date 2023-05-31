'use client';

import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from 'app/hooks/useAuth';
import { InformationModal } from 'components';

const Auth = () => {
  const { errorExists } = useAuth();
  return (
    <InformationModal
      title={
        !errorExists ? 'YOUR ACCOUNT IS VERIFIED' : 'UPS.. SOMETHINGS WRONG'
      }
      buttonText={!errorExists ? 'Go to boards' : 'Back to sign up'}
      buttonUrl={!errorExists ? '/boards' : '/user/register'}
    >
      <div
        className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${
          errorExists ? 'bg-red-100' : 'bg-green-100'
        }`}
      >
        {errorExists ? (
          <XMarkIcon className='h-6 w-6 text-red-600' aria-hidden='true' />
        ) : (
          <CheckIcon className='h-6 w-6 text-green-600' aria-hidden='true' />
        )}
      </div>
    </InformationModal>
  );
};

export default Auth;
