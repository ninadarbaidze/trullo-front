import { getCookie } from 'cookies-next';
import { useContext, useEffect, useState, MouseEvent } from 'react';
import { useForm } from 'react-hook-form';
import { getProfile, updateProfile } from 'services';
import { AuthContext } from 'store';
import { Profile } from 'types/global';

export const useProfile = () => {
  const form = useForm<Profile>({
    defaultValues: {
      username: 'nina',
      image: '',
      repeat_password: '',
      new_password: '',
      email: '',
    },
  });
  const [previewImage, setPreviewImage] = useState('');
  const [imageReseted, setImageReseted] = useState(false);
  const [passwordChangeIsOpen, setPasswordChangeIsOpen] = useState(false);
  const [isInEditMode, setIsInEditMode] = useState(false);
  const setCustomImage = (image: string) => {
    setPreviewImage(image);
  };

  const { user } = useContext(AuthContext);

  const imageUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${form.getValues(
    'image'
  )}`;

  const resetImage = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setPreviewImage('');
    form.setValue('image', '');
  };

  const getProfileData = async () => {
    try {
      const profile = await getProfile(getCookie('token') as string, user.id!);
      form.reset({ ...profile, image: profile.avatar });
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  const onSubmit = async (data: Profile) => {
    try {
      setIsInEditMode(false);

      const formData = new FormData();
      const keys = Object.keys(data);

      keys.forEach((key: string) => {
        formData.append(`${key}`, data[key as keyof Profile]);
      });
      await updateProfile(formData, getCookie('token') as string, user.id!);
    } catch (err: any) {
      console.error(err);
    }
  };

  return {
    form,
    resetImage,
    previewImage,
    imageReseted,
    setImageReseted,
    passwordChangeIsOpen,
    setPasswordChangeIsOpen,
    setCustomImage,
    onSubmit,
    imageUrl,
    isInEditMode,
    setIsInEditMode,
  };
};
