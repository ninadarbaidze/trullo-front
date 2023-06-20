import { getCookie } from 'cookies-next';
import { useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import {
  addTaskAttachments,
  assignTask,
  deleteTaskImage,
  deleteUserFromTask,
  getTaskDetails,
  postTaskDetails,
} from 'services';
import { TaskDetail, TaskDetailForm, UserProfile } from 'types/global';
import { addClickAwayHandler } from 'helpers';

export const useTaskDetailModal = (
  taskId: number,
  boardUsers: UserProfile[]
) => {
  const [taskData, setTaskData] = useState<TaskDetail>();
  const [boardCover, setBoardCover] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const [customImage, setCustomImage] = useState('');
  const [userListIsOpen, setUserListIsOpen] = useState(false);
  const [boardUserList, setBoardUserList] = useState<UserProfile[]>(boardUsers);
  const [taskUserList, setTaskUserList] = useState<UserProfile[]>([]);
  const [isInEditMode, setIsInEditMode] = useState({
    name: false,
    description: false,
  });

  const token = getCookie('token') as string;

  const dropDownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const form = useForm<TaskDetailForm>({
    defaultValues: {
      name: '',
      image: '',
      attachments: [],
      comments: [],
      description: '',
      users: [],
    },
  });

  const getDescription = (description: string) => {
    form.setValue('description', description);
  };

  const getTaskDetail = async () => {
    try {
      const response = await getTaskDetails(token, taskId);

      const taskUserIds = response.users.map((user) => user.id);
      setTaskData(response);
      setTaskUserList(response.users);
      setBoardUserList((prev) =>
        prev.filter((user) => !taskUserIds.includes(user.id))
      );
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
      console.log(boardCover);
      await deleteTaskImage(token, taskId, boardCover);
      setBoardCover('');
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
      const response = await postTaskDetails(token, formData, taskId);
      console.log('wewew', response);
      setBoardCover(response.image);
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
    }
  };

  const toggleDropDown = () => {
    setUserListIsOpen((prev) => !prev);
    addClickAwayHandler(triggerRef, dropDownRef, setUserListIsOpen);
  };

  const assignTaskToUser = async (users: UserProfile[]) => {
    try {
      const userIds = users.map((user) => user.id);

      setBoardUserList((prev) =>
        prev.filter((user) => !userIds.includes(user.id))
      );
      setTaskUserList((prev) => prev.concat(users));
      await assignTask(
        token,
        taskId,
        users.map((user) => user.id)
      );
    } catch (err: any) {
      console.error(err);
    }
  };

  const removeUserFromTask = async (userId: number) => {
    try {
      const removedUser = boardUsers.find((user) => user.id === userId);
      setBoardUserList((prev) => prev.concat(removedUser));
      setTaskUserList((prev) => prev.filter((user) => user.id !== userId));
      await deleteUserFromTask(token, taskId, userId);
    } catch (err: any) {
      console.error(err);
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
    userListIsOpen,
    setUserListIsOpen,
    dropDownRef,
    triggerRef,
    toggleDropDown,
    assignTaskToUser,
    taskUserList,
    boardUserList,
    removeUserFromTask,
  };
};
