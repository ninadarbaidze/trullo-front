import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { createBoard, getAllBoard } from 'services';
import { AuthContext } from 'store';
import { Boards } from 'types/global';

export const useBoards = () => {
  const [boards, setBoards] = useState<Boards[]>([]);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const router = useRouter();

  const { user } = useContext(AuthContext);

  const getBoards = async () => {
    try {
      const boards = await getAllBoard(user.id!, getCookie('token') as string);
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
      const response = await createBoard(
        boardName,
        getCookie('token') as string,
        user.id!
      );
      setBoards((prev) => {
        const newArr = [...prev];
        newArr.push({
          id: response.boardId,
          name: boardName,
          userId: user.id!,
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
