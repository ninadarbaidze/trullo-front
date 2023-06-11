import { getCookie } from 'cookies-next';
import { useParams, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { deleteUserFromBoard, getBoardDetail } from 'services';
import { AuthContext } from 'store';
import { BoardDetail } from 'types/global';

export const useBoardMenuModal = () => {
  const { board } = useContext(AuthContext);
  const [boardDetail, setBoardDetail] = useState<BoardDetail>();
  const params = useParams();

  const getBoardDetailHandler = async () => {
    try {
      const response = await getBoardDetail(
        getCookie('token') as string,
        +params.id
      );
      setBoardDetail(response);
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
      await deleteUserFromBoard(
        getCookie('token') as string,
        +params.id,
        userId
      );
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBoardDetailHandler();
  }, []);

  return { board, boardDetail, deleteUserFromBoardHandler };
};
