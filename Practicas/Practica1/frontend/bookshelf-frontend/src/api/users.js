import axios from "axios";
const API = "http://localhost:3000/api/users";
export const getUsers = async () => {
  const res = await axios.get(API, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
  return res.data;
};