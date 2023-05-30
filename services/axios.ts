import axios from 'axios';
import { setCookie } from 'cookies-next';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message.includes('expired')
    ) {
      console.log('here');
      try {
        return instance.get('/refresh_token').then((response) => {
          const newAccessToken = response.data.token;
          setCookie('token', newAccessToken);
          const originalRequest = error.config;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return instance(originalRequest);
        });
      } catch (err: any) {
        console.error('Failed to refresh access token:', error);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
