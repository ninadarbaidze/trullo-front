import { cookies } from 'next/dist/client/components/headers';
import { useForm } from 'react-hook-form';
import { loginUser } from 'services';
import { LoginData } from 'types/global';
import { setCookie } from 'cookies-next';

export const useLoginForm = () => {
  const form = useForm<LoginData>({
    defaultValues: {
      username: '',

      password: '',
    },
  });

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await loginUser(data);
      console.log(response);
      setCookie('token', response.accessToken, { maxAge: 15 * 60 * 1000 });
      setCookie('user', response.userId, { maxAge: 15 * 60 * 1000 });
    } catch (err: any) {
      console.error(err);
    }
    console.log(data);
  };
  return { form, onSubmit };
};
