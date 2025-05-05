import axios from "axios";

const API_BASE = `${process.env.REACT_APP_API_BASE}/users`;

// Tüm kullanıcıları getir
export const getUsers = async () => {
  const response = await axios.get(API_BASE);
  return response.data;
};


export const createUser = async (userData) => {
  const response = await axios.post(API_BASE, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`${API_BASE}/${id}`);
  return response.data;
};

export const getUserById = async (id) => {
  const response = await axios.get(`${API_BASE}/${id}`);
  return response.data;
};

// Kullanıcıyı güncelle (ileride kullanılabilir)
export const updateUser = async (id, userData) => {
  const response = await axios.put(`${API_BASE}/${id}`, userData);
  return response.data;
};

