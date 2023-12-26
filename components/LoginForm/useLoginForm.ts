import { useForm } from 'react-hook-form';
import { loginUser } from 'services';
import { LoginData } from 'types/global';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export const useLoginForm = () => {
  const router = useRouter();
  const form = useForm<LoginData>({
    defaultValues: {
      username: '',
      remember: false,
      password: '',
    },
  });

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await loginUser(data);
      setCookie('token', response.accessToken);
      setCookie('user', response.user);
      router.push('/boards');
    } catch (err: any) {
      console.error(err);
    }
  };
  return { form, onSubmit, router };
};
