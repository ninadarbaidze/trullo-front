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
    console.log(data);
    try {
      const response = await loginUser(data);
      console.log(response);
      setCookie('token', response.accessToken, { maxAge: 15 * 60 * 1000 });
      setCookie('user', response.user, { maxAge: 15 * 60 * 1000 });
      router.push('/boards');
    } catch (err: any) {
      console.error(err);
    }
    console.log(data);
  };
  return { form, onSubmit, router };
};
