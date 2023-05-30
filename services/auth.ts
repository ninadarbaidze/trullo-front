import axios from 'services/axios';
import { LoginData, RegisterData } from 'types/global';

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
