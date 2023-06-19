import { getCookie } from 'cookies-next';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  addTaskAttachments,
  deleteTaskImage,
  getTaskDetails,
  postTaskDetails,
} from 'services';
import { NoImage } from 'public/images';
import { TaskDetail, TaskDetailForm } from 'types/global';

export const useTaskDetailModal = (taskId: number) => {
  const [taskData, setTaskData] = useState<TaskDetail>();
  const [boardCover, setBoardCover] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const [customImage, setCustomImage] = useState('');
  const [isInEditMode, setIsInEditMode] = useState({
    name: false,
    description: false,
  });

  const token = getCookie('token') as string;

  const form = useForm<TaskDetailForm>({
    defaultValues: {
      name: '',
      image: '',
      attachments: [],
      comments: [],
      description: '',
    },
  });

  const getDescription = (description: string) => {
    form.setValue('description', description);
  };

  const getTaskDetail = async () => {
    try {
      const response = await getTaskDetails(token, taskId);
      setTaskData(response);
      form.setValue('attachments', response.attachments);
      form.setValue('name', response.content);
      form.setValue('image', response.image as string);

      setBoardCover(response.image as string);
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTaskDetail();
  }, []);

  const resetTaskImage = async () => {
    try {
      form.setValue('image', '');
      setCustomImage('');
      setBoardCover('');
      await deleteTaskImage(token, taskId);
    } catch (err: any) {
      console.error(err);
    }
  };

  const onSubmit = async (data: TaskDetailForm) => {
    try {
      const formData = new FormData();
      const keys = Object.keys(data);

      keys.forEach((key: string) => {
        if (key !== 'attachments' && key !== 'image') {
          formData.append(`${key}`, (data as any)[key]);
        }
      });

      await postTaskDetails(token, formData, taskId);
    } catch (err: any) {
      console.error(err);
    }
  };

  const submitImageHandler = async () => {
    try {
      const formData = new FormData();
      formData.append('image', form.getValues('image'));
      await postTaskDetails(token, formData, taskId);
    } catch (err: any) {
      console.error(err);
    }
  };

  const submitImages = async (files: File[]) => {
    try {
      const formData = new FormData();

      files.forEach((file) => {
        if (file.name) {
          formData.append(`attachments`, file);
        }
      });

      await addTaskAttachments(token, formData, taskId);
    } catch (err: any) {
      console.error(err);
    }
  };

  const setEditState = (field: 'name' | 'desc') => {
    if (field === 'name') {
      setIsInEditMode((prev) => {
        return { ...prev, name: !prev.name };
      });
    } else {
      setIsInEditMode((prev) => {
        return { ...prev, description: !prev.description };
      });
    }
  };

  const getImage = () => {
    if (customImage) {
      return customImage;
    } else if (!customImage && boardCover) {
      return `${process.env.NEXT_PUBLIC_BACKEND_URL}/${boardCover}`;
    } else {
      return NoImage.src;
    }
  };

  return {
    form,
    getDescription,
    onSubmit,
    fileRef,
    customImage,
    setCustomImage,
    resetTaskImage,
    taskData,
    submitImages,
    setEditState,
    isInEditMode,
    submitImageHandler,
    getImage,
    boardCover,
  };
};
