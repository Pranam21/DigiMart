import apiClient from './apiClient';

export const registerUser = async (user) => {
  const res = await apiClient.post('/users/register', user);
  return res.data;
};

export const getUserByEmail = async (email) => {
  const res = await apiClient.get(`/users/${encodeURIComponent(email)}`);
  return res.data;
};
