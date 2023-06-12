import { getCookie } from 'cookies-next';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import {
  changeBoardDescription,
  deleteUserFromBoard,
  getBoardDetail,
} from 'services';
import { AuthContext } from 'store';
import { BoardDetail } from 'types/global';

export const useBoardMenuModal = () => {
  const { board } = useContext(AuthContext);
  const [boardDetail, setBoardDetail] = useState<BoardDetail>();
  const params = useParams();
  const boardId = +params.id;

  const getBoardDetailHandler = async () => {
    try {
      const response = await getBoardDetail(
        getCookie('token') as string,
        boardId
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
      await deleteUserFromBoard(getCookie('token') as string, boardId, userId);
    } catch (err: any) {
      console.error(err);
    }
  };

  const submitTextHandler = async (boardDescription: string) => {
    try {
      await changeBoardDescription(
        getCookie('token') as string,
        boardId,
        boardDescription
      );
    } catch (err: any) {
      console.error(err);
    }
    console.log(boardDescription);
  };

  useEffect(() => {
    getBoardDetailHandler();
  }, []);

  return { board, boardDetail, deleteUserFromBoardHandler, submitTextHandler };
};
