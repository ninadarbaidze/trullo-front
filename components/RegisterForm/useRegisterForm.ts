import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { registerUser } from 'services';
import { RegisterData } from 'types/global';

export const useRegisterForm = () => {
  const router = useRouter();
  const form = useForm<RegisterData>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      repeat_password: '',
      firstName: '',
      lastName: '',
    },
  });
  const [registered, setRegistered] = useState(false);

  const onSubmit = async (data: RegisterData) => {
    try {
      await registerUser(data);
      setRegistered(true);
    } catch (err: any) {
      setRegistered(false);
      console.error(err);
    }
  };
  return { form, onSubmit, router, registered };
};
