import axios from 'services/axios';
import { TaskDetail } from 'types/global';

export const postTaskDetails = async (
  token: string,
  data: FormData,
  taskId: number
): Promise<string> => {
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
  taskId: number
): Promise<string> => {
  const res = await axios.delete(`/task-image/${taskId}`, {
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