import { useForm } from 'react-hook-form';

export const useTaskDetailModal = () => {
  const form = useForm({
    defaultValues: {
      name: 'Go here and then here',
      image: '',
      attachments: [],
      comments: [],
      description: '',
    },
  });

  const getDescription = (description: string) => {
    form.setValue('description', description);
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return { form, getDescription, onSubmit };
};
