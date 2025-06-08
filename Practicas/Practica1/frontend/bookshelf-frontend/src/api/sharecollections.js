import axios from "axios";
const API = "http://localhost:3000/api/shared-collections";

export const shareCollection = async (coleccionId, usuarioId) => {
  await axios.post(`${API}/share`, { coleccionId, usuarioId }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
};
export const unshareCollection = async (coleccionId, usuarioId) => {
  await axios.delete(`${API}/unshare`, { data: { coleccionId, usuarioId }, headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
};
export const getSharedCollectionsByUser = async (usuarioId) => {
  const res = await axios.get(`${API}/user/${usuarioId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
  return res.data;
};
