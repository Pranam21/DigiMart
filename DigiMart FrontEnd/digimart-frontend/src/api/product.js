import apiClient from './apiClient';

export const fetchProducts = async () => {
  const res = await apiClient.get('/products');
  return res.data; // array of ProductDto
};

export const fetchProductById = async (id) => {
  const res = await apiClient.get(`/products/${id}`);
  return res.data;
};
