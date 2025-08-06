import apiClient from './apiClient';

// place an order payload depends on your backend dto; example:
export const createOrder = async (orderPayload) => {
  const res = await apiClient.post('/orders', orderPayload);
  return res.data; // OrderDto
};

// fetch all orders (or you can add query params for customer)
export const fetchOrders = async (params = {}) => {
  const res = await apiClient.get('/orders', { params });
  return res.data; // array of OrderDto
};

export const fetchOrderById = async (id) => {
  const res = await apiClient.get(`/orders/${id}`);
  return res.data;
};
