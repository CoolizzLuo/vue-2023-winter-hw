import axiosInstance from './axiosInstance';

const login = async (payload) => {
  return await axiosInstance.post('/admin/signin', payload);
};

const logout = async () => {
  return await axiosInstance.post('/logout');
};

const checkToken = async () => {
  return await axiosInstance.post('/api/user/check');
};

const getProducts = async () => {
  return await axiosInstance.get(`/api/${import.meta.env.VITE_API_PATH}/admin/products`);
};

export default {
  login,
  logout,
  checkToken,
  getProducts,
};
