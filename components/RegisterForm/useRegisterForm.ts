import { useRouter } from 'next/navigation';
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
    },
  });

  const onSubmit = async (data: RegisterData) => {
    try {
      await registerUser(data);
    } catch (err: any) {
      console.error(err);
    }
    console.log(data);
  };
  return { form, onSubmit, router };
};
