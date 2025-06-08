import { Box, Button, TextField, Typography, Link as MuiLink } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AuthForm({ onSubmit, title, isRegister = false }) {
  const [form, setForm] = useState({
    correo: '',
    password: '',
    nombres: '',
    apellidos: '',
    fecha_nacimiento: '',
    genero: '',
  });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await onSubmit(form);
    } catch (err) {
      setError(err.response?.data?.message || 'Error en la autenticación');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ bgcolor: 'background.paper', p: 4, borderRadius: 3 }}>
      <Typography variant="h5" color="primary" gutterBottom>{title}</Typography>
      {isRegister && (
        <>
          <TextField margin="normal" fullWidth label="Nombres" name="nombres" value={form.nombres} onChange={handleChange} autoFocus />
          <TextField margin="normal" fullWidth label="Apellidos" name="apellidos" value={form.apellidos} onChange={handleChange} />
          <TextField
            margin="normal"
            fullWidth
            label="Fecha de nacimiento"
            name="fecha_nacimiento"
            type="date"
            value={form.fecha_nacimiento}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="normal"
            fullWidth
            select
            label="Género"
            name="genero"
            value={form.genero}
            onChange={handleChange}
            SelectProps={{ native: true }}
          >
            <option value="">Selecciona género</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="O">Otro</option>
          </TextField>
        </>
      )}
      <TextField margin="normal" fullWidth label="Correo" name="correo" value={form.correo} onChange={handleChange} type="email" />
      <TextField margin="normal" fullWidth label="Contraseña" name="password" value={form.password} onChange={handleChange} type="password" />
      {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>{title}</Button>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <MuiLink component={Link} to={isRegister ? "/login" : "/register"} color="secondary">
          {isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
        </MuiLink>
      </Box>
    </Box>
  );
}
