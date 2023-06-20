import axios from 'services/axios';
import {
  AllUser,
  Board,
  BoardDetail,
  Boards,
  ProfileBackInfo,
} from 'types/global';

export const getBoard = async (
  boardId: number,
  token: string,
  userId: number
): Promise<Board> => {
  const res = await axios.get(`/board/${boardId}/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  return res.data;
};

export const getAllBoard = async (
  userId: number,
  token: string
): Promise<Boards[]> => {
  const res = await axios.get(`/boards/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  return res.data;
};

export const createBoard = async (data: FormData, token: string) => {
  const res = await axios.post(`/create-board`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'multipart/form-data',
    },
  });
  return res.data;
};
export const reorderTask = async (
  taskId: number,
  prevTaskId: number,
  nextTaskId: number,
  isChangingColumn: boolean,
  columnId: number,
  token: string
) => {
  const res = await axios.patch(
    `/reorder-task/${taskId}`,
    {
      columnId,
      isChangingColumn,
      prevTaskId,
      nextTaskId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const reorderColumn = async (
  columnId: number,
  prevColumnId: number,
  nextColumnId: number,
  token: string
) => {
  const res = await axios.patch(
    `/reorder-column/${columnId}`,
    {
      boardId: 1,
      prevColumnId,
      nextColumnId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const addColumn = async (
  lastIndexOfColumn: number | null,
  title: string = 'todo',
  boardId: number,
  token: string
) => {
  const res = await axios.post(
    `/create-column/${boardId}`,
    {
      title,
      prevIndex: lastIndexOfColumn,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const addTask = async (
  columnId: string,
  lastIndexOfColumn: number | null,
  content: string,
  boardId: number,
  token: string
) => {
  const res = await axios.post(
    `/create-task/${columnId.slice(7)}`,
    {
      content,
      prevIndex: lastIndexOfColumn,
      boardId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const deleteTask = async (taskId: string, token: string) => {
  const res = await axios.delete(`/delete-task/${taskId.slice(5)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteColumn = async (columnId: string, token: string) => {
  const res = await axios.delete(`/delete-column/${columnId.slice(7)}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateColumn = async (
  columnId: string,
  title: string,
  token: string
) => {
  const res = await axios.patch(
    `/update-column/${columnId.slice(7)}`,
    {
      title,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const getAllUsers = async (
  token: string,
  boardId: number
): Promise<ProfileBackInfo[]> => {
  const res = await axios.get(
    `/all-users/${boardId}`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const getAllBoardUsers = async (
  token: string,
  boardId: number
): Promise<ProfileBackInfo[]> => {
  const res = await axios.get(
    `/all-board-users/${boardId}`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const sendInvitationsToBoard = async (
  token: string,
  users: AllUser[],
  boardName: string,
  boardId: number
): Promise<ProfileBackInfo[]> => {
  const res = await axios.post(
    `/send-board-invitations`,
    { users, boardName, boardId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const verifyBoard = async (
  token: string,
  userId: number,
  verificationToken: string
): Promise<{ boardId: number; boardName: string }> => {
  const res = await axios.post(
    `/verify-board`,
    { token: verificationToken, userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const getBoardDetail = async (
  token: string,
  boardId: number
): Promise<BoardDetail> => {
  const res = await axios.get(`/board-detail/${boardId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteUserFromBoard = async (
  token: string,
  boardId: number,
  userId: number
): Promise<BoardDetail> => {
  const res = await axios.patch(
    `/remove-board-user`,
    { userId, boardId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const changeBoardDescription = async (
  token: string,
  boardId: number,
  content: string
): Promise<string> => {
  const res = await axios.put(
    `/board-description`,
    { description: content, boardId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const updateBoard = async (
  token: string,
  data: FormData,
  boardId: number
): Promise<{ boardDetails: BoardDetail }> => {
  const res = await axios.patch(`/update-board/${boardId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const removeBoardImage = async (
  token: string,
  boardId: number,
  boardCover: string
): Promise<string> => {
  const res = await axios.patch(
    `/remove-board-image/${boardId}/${boardCover}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
