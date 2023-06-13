import { getCookie, setCookie } from 'cookies-next';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { deleteUserFromBoard, getBoardDetail, updateBoard } from 'services';
import { BoardDetail } from 'types/global';
import { useForm } from 'react-hook-form';
import { NoImage } from 'public/images';

export const useBoardMenuModal = () => {
  const [boardDetail, setBoardDetail] = useState<BoardDetail>();
  const [boardCover, setBoardCover] = useState('');
  const [isInEditMode, setIsInEdiMode] = useState(false);
  const params = useParams();
  const boardId = +params.id;

  useEffect(() => {
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
      const response = await getBoardDetail(
        getCookie('token') as string,
        boardId
      );
      setBoardDetail(response);
      setBoardCover(response.image);
      form.reset({ name: response.name });
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
      await deleteUserFromBoard(getCookie('token') as string, boardId, userId);
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
    try {
      const formData = new FormData();
      const keys = Object.keys(data);

      keys.forEach((key: string) => {
        formData.append(
          `${key}`,
          data[key as keyof { name: string; image: File }]
        );
      });

      console.log(formData);

      if (data.name) {
        setBoardDetail((prev) => {
          return { ...prev, name: data.name } as BoardDetail;
        });
        setCookie('board', data.name);
      }

      const response = await updateBoard(
        getCookie('token') as string,
        formData,
        boardId
      );
      setIsInEdiMode(false);
      console.log(response.boardDetails);
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
  };
};
