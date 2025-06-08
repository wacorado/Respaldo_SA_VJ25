import axios from 'axios';

const API = 'http://localhost:3000/api';

// LOGIN: ahora espera { correo, password }
export const loginUser = async ({ correo, password }) => {
  const res = await axios.post(`${API}/auth/login`, { correo, password });
  if (res.data.token) localStorage.setItem('token', res.data.token);
  return res.data;
};

// REGISTRO: ahora envía todos los campos requeridos
export const registerUser = async ({
  correo,
  password,
  nombres,
  apellidos,
  fecha_nacimiento,
  genero
}) => {
  // roleId 2: usuario normal
  const res = await axios.post(`${API}/auth/register`, {
    correo,
    password,
    nombres,
    apellidos,
    fecha_nacimiento,
    genero,
    roleId: 2
  });
  return res.data;
};
