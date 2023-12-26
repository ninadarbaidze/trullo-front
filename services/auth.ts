import axios from 'services/axios';
import { LoginData, ProfileBackInfo, RegisterData } from 'types/global';

export const registerUser = async (data: RegisterData) => {
  const res = await axios.post(`/signup`, { ...data });
  return res.data;
};

export const loginUser = async (data: LoginData) => {
  const res = await axios.post(`/login`, { ...data });
  return res.data;
};

export const verifyUser = async (token: string) => {
  const res = await axios.post(`/verify-account/${token}`, {});
  return res.data;
};

export const updatePassword = async (password: string, token: string) => {
  const res = await axios.post(
    `/update-password/${token}`,
    { password },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};

export const updateProfile = async (
  data: FormData,
  token: string,
  userId: number
): Promise<{ message: string; userInfo: ProfileBackInfo }> => {
  const res = await axios.put(`/update-profile/${userId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'content-type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const getProfile = async (
  token: string,
  userId: number
): Promise<ProfileBackInfo> => {
  const res = await axios.get(`/profile/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
