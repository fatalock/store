import axios from "axios";

const API_BASE = `${process.env.REACT_APP_API_BASE}/categories`;

export const getAllCategories = async () => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const getCategoryById = async (id) => {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data;
};

export const createCategory = async (data) => {
  const res = await axios.post(API_BASE, data);
  return res.data;
};

export const deleteCategory = async (id) => {
  const res = await axios.delete(`${API_BASE}/${id}`);
  return res.data;
};

export const getSubCategories = async (parentCategoryId) => {
  const res = await axios.get(`${API_BASE}/${parentCategoryId}/subcategories`);
  return res.data;
};

export const updateCategory = async (id, data) => {
  const res = await axios.put(`${API_BASE}/${id}`, data);
  return res.data;
};
