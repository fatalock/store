import axios from "axios";

const API_BASE = `${process.env.REACT_APP_API_BASE}/products`;

export const getAllProducts = async () => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const getProductById = async (id) => {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data;
};

export const createProduct = async (productData) => {
  const res = await axios.post(API_BASE, productData);
  return res.data;
};

export const updateProduct = async (id, productData) => {
  const res = await axios.put(`${API_BASE}/${id}`, productData);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(`${API_BASE}/${id}`);
  return res.data;
};
