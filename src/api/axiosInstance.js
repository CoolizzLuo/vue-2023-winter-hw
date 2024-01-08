import cookieHelper from '@/cookieHelper';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = cookieHelper.getCookie('token');

  return {
    ...config,
    headers: {
      ...config.headers,
      Authorization: token ?? '',
    },
  };
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      cookieHelper.removeCookie('token');
      window.alert('Your have not logged in or your session has expired. Please log in again');
      window.location.reload();
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
