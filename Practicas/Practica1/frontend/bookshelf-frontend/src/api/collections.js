import axios from "axios";
const API = "http://localhost:3000/api/collections";

// Listar todas las colecciones
export const getCollections = async () => {
  const res = await axios.get(API, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
  return res.data;
};

// Crear una colección
export const createCollection = async (data) => {
  const res = await axios.post(API, data, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
  return res.data;
};

// Actualizar colección
export const updateCollection = async (id, data) => {
  const res = await axios.put(`${API}/${id}`, data, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
  return res.data;
};

// Eliminar colección
export const deleteCollection = async (id) => {
  await axios.delete(`${API}/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
};

// Obtener una colección y sus libros
export const getCollection = async (id) => {
  const res = await axios.get(`${API}/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
  return res.data;
};
