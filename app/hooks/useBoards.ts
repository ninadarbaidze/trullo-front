import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createBoard, getAllBoard } from 'services';
import { Boards } from 'types/global';

export const useBoards = () => {
  const [boards, setBoards] = useState<Boards[]>([]);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const router = useRouter();

  const getBoards = async () => {
    try {
      const userId = JSON.parse(getCookie('user') as string).id;
      const boards = await getAllBoard(userId, getCookie('token') as string);
      setBoards(boards);
    } catch (err: any) {
      console.error(err);
    }
  };
  useEffect(() => {
    getBoards();
  }, []);

  const addNewBoardHandler = async (boardName: string) => {
    try {
      const userId = JSON.parse(getCookie('user') as string).id;
      const response = await createBoard(
        boardName,
        getCookie('token') as string,
        userId
      );
      setBoards((prev) => {
        const newArr = [...prev];
        newArr.push({
          id: response.boardId,
          name: boardName,
          userId,
          image: null,
        });
        return newArr;
      });
      setAddModalIsOpen(false);
    } catch (err: any) {
      console.error(err);
    }
  };
  const closeModalHandler = () => {
    setAddModalIsOpen(false);
  };

  return {
    boards,
    router,
    addModalIsOpen,
    setAddModalIsOpen,
    addNewBoardHandler,
    closeModalHandler,
  };
};
