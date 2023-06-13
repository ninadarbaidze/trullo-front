import { getCookie, setCookie } from 'cookies-next';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import {
  deleteUserFromBoard,
  getBoardDetail,
  removeBoardImage,
  updateBoard,
} from 'services';
import { BoardDetail } from 'types/global';
import { useForm } from 'react-hook-form';
import { NoImage } from 'public/images';
import { AuthContext } from 'store';

export const useBoardMenuModal = () => {
  const [boardDetail, setBoardDetail] = useState<BoardDetail>();
  const [boardCover, setBoardCover] = useState('');
  const [isInEditMode, setIsInEdiMode] = useState(false);
  const [boardIsOpen, setBoardIsOpen] = useState(false);
  const [boardIsLoading, setBoardIsLoading] = useState(true);
  const params = useParams();
  const boardId = +params.id;
  const token = getCookie('token') as string;

  const { user } = useContext(AuthContext);

  const canUpdateBoard = user.id === boardDetail?.boardOwnerId;

  useEffect(() => {
    setBoardIsOpen(true);
    getBoardDetailHandler();
  }, []);

  const form = useForm({
    defaultValues: {
      image: boardDetail?.image ?? '',
      description: boardDetail?.description ?? '',
      name: boardDetail?.name ?? '',
    },
  });

  const getBoardDetailHandler = async () => {
    try {
      const response = await getBoardDetail(token, boardId);
      setBoardDetail(response);
      setBoardCover(response.image);
      form.reset({ name: response.name });
      setBoardIsLoading(false);
    } catch (err: any) {
      console.error(err);
    }
  };

  const deleteUserFromBoardHandler = async (userId: number) => {
    try {
      setBoardDetail((prev) => {
        let newState = {
          ...prev,
          users: prev?.users.filter((user) => user.id !== userId),
        };
        return newState as BoardDetail;
      });
      await deleteUserFromBoard(token, boardId, userId);
    } catch (err: any) {
      console.error(err);
    }
  };

  const getDescription = async (boardDescription: string) => {
    form.setValue('description', boardDescription);
  };

  const onSubmit = async (data: {
    name: string;
    description: string;
    image: Blob | string;
  }) => {
    console.log('data', data);

    try {
      const formData = new FormData();
      const keys = Object.keys(data);

      keys.forEach((key: string) => {
        formData.append(
          `${key}`,
          data[key as keyof { name: string; image: File }]
        );
      });

      if (data.name) {
        setBoardDetail((prev) => {
          return { ...prev, name: data.name } as BoardDetail;
        });
        setCookie('board', data.name);
      }

      const response = await updateBoard(token, formData, boardId);
      setIsInEdiMode(false);
      setBoardCover(response.boardDetails.image);
    } catch (err: any) {
      console.error(err);
    }
  };

  const getImage = () => {
    if (boardCover) {
      return `${process.env.NEXT_PUBLIC_BACKEND_URL}/${boardCover}`;
    } else return NoImage.src;
  };

  const removeImageHandler = async () => {
    try {
      setBoardCover('');
      form.setValue('image', '');
      await removeBoardImage(token, boardId);
    } catch (err: any) {
      console.error(err);
    }
  };

  return {
    boardDetail,
    deleteUserFromBoardHandler,
    getDescription,
    form,
    boardCover,
    setBoardCover,
    onSubmit,
    isInEditMode,
    setIsInEdiMode,
    getImage,
    canUpdateBoard,
    removeImageHandler,
    setBoardIsOpen,
    boardIsOpen,
    boardIsLoading,
  };
};
