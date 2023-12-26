import axios from 'services/axios';
import { Label, TaskDetail } from 'types/global';

export const postTaskDetails = async (
  token: string,
  data: FormData,
  taskId: number
): Promise<TaskDetail> => {
  const res = await axios.post(`/task-detail/${taskId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const addTaskAttachments = async (
  token: string,
  data: FormData,
  taskId: number
): Promise<string> => {
  const res = await axios.patch(`/add-attachments/${taskId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const deleteTaskAttachment = async (
  token: string,
  attachmentId: number
): Promise<string> => {
  const res = await axios.delete(`/delete-attachments/${attachmentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteTaskImage = async (
  token: string,
  taskId: number,
  imageName: string
): Promise<string> => {
  const res = await axios.delete(`/task-image/${taskId}/${imageName}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getTaskDetails = async (
  token: string,
  taskId: number
): Promise<TaskDetail> => {
  const res = await axios.get(`/task-detail/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const downloadAttachment = async (
  token: string,
  attachmentId: number
): Promise<string> => {
  const res = await axios.get(`/task-attachments/${attachmentId}`, {
    headers: {
      'Content-Disposition': 'attachment',
      Authorization: `Bearer ${token}`,
    },
    responseType: 'blob',
  });
  return res.data;
};

export const assignTask = async (
  token: string,
  taskId: number,
  userIds: number[],
  userId: number
): Promise<string> => {
  const res = await axios.patch(
    `/assign-task/${taskId}`,
    { userIds, userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const deleteUserFromTask = async (
  token: string,
  taskId: number,
  userId: number
): Promise<string> => {
  const res = await axios.delete(`/delete-user-task/${taskId}/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const addLabel = async (
  token: string,
  boardId: number,
  data: { color: string; title: string }
): Promise<Label> => {
  const res = await axios.post(`/add-label/${boardId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const assignLabelToTask = async (
  token: string,
  taskId: number,
  labelId: number
): Promise<string> => {
  const res = await axios.patch(
    `/assign-label/${taskId}/${labelId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const removeLabel = async (
  token: string,
  taskId: number,
  labelId: number
): Promise<string> => {
  const res = await axios.delete(`/remove-label/${taskId}/${labelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteLabel = async (
  token: string,
  labelId: number
): Promise<string> => {
  const res = await axios.delete(`/delete-label/${labelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getBoardLabels = async (
  token: string,
  boardId: number
): Promise<Label[]> => {
  const res = await axios.get(`/board-labels/${boardId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const addComment = async (
  token: string,
  taskId: number,
  data: { content: string; userId: number }
): Promise<Label> => {
  const res = await axios.post(`/comment/${taskId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const patchComment = async (
  token: string,
  data: { content: string; commentId: number }
): Promise<Label> => {
  const res = await axios.patch(`/edit-comment`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteComment = async (
  token: string,
  commentId: number
): Promise<Label> => {
  const res = await axios.delete(`/delete-comment/${commentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
