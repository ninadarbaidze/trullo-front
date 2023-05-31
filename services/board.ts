import axios from 'services/axios';

export const getBoard = async (boardId: number = 1, token: string) => {
  const res = await axios.get(`/board/${boardId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
  return res.data;
};

export const reorderTask = async (
  taskId: number,
  prevTaskId: number,
  nextTaskId: number,
  isChangingColumn: boolean,
  columnId: number
) => {
  const res = await axios.patch(`/reorder-task/${taskId}`, {
    columnId,
    isChangingColumn,
    prevTaskId,
    nextTaskId,
  });
  return res.data;
};

export const reorderColumn = async (
  columnId: number,
  prevColumnId: number,
  nextColumnId: number
) => {
  const res = await axios.patch(`/reorder-column/${columnId}`, {
    boardId: 1,
    prevColumnId,
    nextColumnId,
  });
  return res.data;
};

export const addColumn = async (
  lastIndexOfColumn: number | null,
  title: string = 'todo',
  boardId: number = 1
) => {
  const res = await axios.post(`/create-column/${boardId}`, {
    title,
    prevIndex: lastIndexOfColumn,
  });
  return res.data;
};

export const addTask = async (
  columnId: string,
  lastIndexOfColumn: number | null,
  content: string = 'task 5'
) => {
  const res = await axios.post(`/create-task/${columnId.slice(7)}`, {
    content,
    prevIndex: lastIndexOfColumn,
  });
  return res.data;
};

export const deleteTask = async (taskId: string) => {
  const res = await axios.delete(`/delete-task/${taskId.slice(5)}`);
  return res.data;
};

export const deleteColumn = async (columnId: string) => {
  const res = await axios.delete(`/delete-column/${columnId.slice(7)}`);
  return res.data;
};

export const updateColumn = async (columnId: string, title: string) => {
  const res = await axios.patch(`/update-column/${columnId.slice(7)}`, {
    title,
  });
  return res.data;
};
