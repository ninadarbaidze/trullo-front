import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { createBoard, getAllBoard } from 'services';
import { AuthContext } from 'store';
import { Boards } from 'types/global';
import { NoImage } from 'public/images';

export const useBoards = () => {
  const [boards, setBoards] = useState<Boards[]>([]);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const { user } = useContext(AuthContext);

  const token = getCookie('token') as unknown as string;

  const getBoards = async () => {
    try {
      const boards = await getAllBoard(user.id!, token);
      setBoards(boards);
      setIsLoading(false);
    } catch (err: any) {
      console.error(err);
    }
  };
  useEffect(() => {
    getBoards();
  }, []);

  const addNewBoardHandler = async (data: { name: string; image: File }) => {
    setIsLoading(true);
    setAddModalIsOpen(false);

    try {
      const formData = new FormData();
      const keys = Object.keys(data);

      keys.forEach((key: string) => {
        formData.append(
          `${key}`,
          data[key as keyof { name: string; image: File }]
        );
      });

      formData.append('userId', user.id!);
      await createBoard(formData, token);
      await getBoards();
    } catch (err: any) {
      console.error(err);
    }
  };
  const closeModalHandler = () => {
    setAddModalIsOpen(false);
  };

  const getImage = (board: Boards) => {
    if (board?.image) {
      return `${process.env.NEXT_PUBLIC_BACKEND_URL}/${board.image}`;
    } else return NoImage.src;
  };
  return {
    boards,
    router,
    addModalIsOpen,
    setAddModalIsOpen,
    addNewBoardHandler,
    closeModalHandler,
    isLoading,
    getImage,
  };
};
