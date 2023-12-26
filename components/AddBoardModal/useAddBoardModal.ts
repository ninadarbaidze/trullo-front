import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const useAddBoardModal = () => {
  const [previewImage, setPreviewImage] = useState('');
  const form = useForm({
    defaultValues: {
      image: '',
      name: '',
    },
  });

  const setCustomImage = (image: string) => {
    setPreviewImage(image);
  };

  return { form, previewImage, setCustomImage, setPreviewImage };
};
