import axios from "axios";

const API_BASE = `${process.env.REACT_APP_API_BASE}/orders`;

export const getOrdersByUser = async (userId) => {
  const res = await axios.get(`${API_BASE}/byuser/${userId}`);
  return res.data;
};

export const getAllOrders = async () => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const getOrderById = async (id) => {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data;
};

export const deleteOrder = async (id) => {
  const res = await axios.delete(`${API_BASE}/${id}`);
  return res.data;
};

export const createOrder = async (orderData) => {
  const res = await axios.post(API_BASE, orderData);
  return res.data;
};
