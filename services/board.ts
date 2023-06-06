import axios from 'services/axios';
import { Board, Boards } from 'types/global';

export const getBoard = async (
  boardId: number,
  token: string
): Promise<Board> => {
  const res = await axios.get(`/board/${boardId}`, {
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
