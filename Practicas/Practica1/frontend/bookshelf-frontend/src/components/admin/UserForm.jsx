import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack,
  Alert
} from "@mui/material";

// Recibe "user" si es edición, sino es registro
export default function UserForm({ user = null, onSuccess }) {
  const [form, setForm] = useState({
    nombres: "",
    apellidos: "",
    correo: "",
    password: "",
    fecha_nacimiento: "",
    genero: "",
    roleId: 2, // Por defecto usuario normal
  });

  const [error, setError] = useState("");

  // Cargar datos si estamos editando
  useEffect(() => {
    if (user) {
      setForm({
        nombres: user.nombres || "",
        apellidos: user.apellidos || "",
        correo: user.correo || user.email || "",
        password: "",
        fecha_nacimiento: user.fecha_nacimiento || "",
        genero: user.genero || "",
        roleId: user.roleId || user.rolId || 2,
      });
    }
  }, [user]);

  // Para edición, la contraseña es opcional
  const isEdit = !!user;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validaciones básicas
    if (!form.nombres || !form.apellidos || !form.correo || !form.fecha_nacimiento || !form.genero || !form.roleId) {
      setError("Completa todos los campos obligatorios.");
      return;
    }

    // Si es registro, la contraseña es obligatoria
    if (!isEdit && !form.password) {
      setError("La contraseña es obligatoria.");
      return;
    }

    // Si es edición y no se quiere cambiar la contraseña, no la envíes
    const payload = { ...form };
    if (isEdit && !form.password) {
      delete payload.password;
    }

    try {
      const url = isEdit
        ? `http://localhost:3000/api/auth/users/${user.id}` // <-- Ajusta tu endpoint
        : "http://localhost:3000/api/auth/register";
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Error en el servidor");
      if (onSuccess) onSuccess();
    } catch (err) {
      setError("Error al " + (isEdit ? "modificar" : "registrar") + " usuario. Verifica los datos.");
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
      <Paper sx={{ p: 4, bgcolor: "#232323", minWidth: 350 }}>
        <Typography variant="h6" color="primary" mb={2}>
          {isEdit ? "Modificar Usuario" : "Agregar Usuario"}
        </Typography>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Stack spacing={2}>
            <TextField
              name="nombres"
              label="Nombres"
              value={form.nombres}
              onChange={handleChange}
              required
              InputLabelProps={{ style: { color: "#fff" } }}
              sx={{ input: { color: "#fff" } }}
            />
            <TextField
              name="apellidos"
              label="Apellidos"
              value={form.apellidos}
              onChange={handleChange}
              required
              InputLabelProps={{ style: { color: "#fff" } }}
              sx={{ input: { color: "#fff" } }}
            />
            <TextField
              name="correo"
              label="Correo"
              type="email"
              value={form.correo}
              onChange={handleChange}
              required
              InputLabelProps={{ style: { color: "#fff" } }}
              sx={{ input: { color: "#fff" } }}
            />
            <TextField
              name="password"
              label="Contraseña"
              type="password"
              value={form.password}
              onChange={handleChange}
              required={!isEdit}
              InputLabelProps={{ style: { color: "#fff" } }}
              sx={{ input: { color: "#fff" } }}
              helperText={isEdit ? "Solo llena si deseas cambiar la contraseña." : ""}
            />
            <TextField
              name="fecha_nacimiento"
              label="Fecha de nacimiento"
              type="date"
              value={form.fecha_nacimiento}
              onChange={handleChange}
              required
              InputLabelProps={{
                style: { color: "#fff" },
                shrink: true,
              }}
              sx={{ input: { color: "#fff" } }}
            />
            <TextField
              select
              name="genero"
              label="Género"
              value={form.genero}
              onChange={handleChange}
              required
              InputLabelProps={{ style: { color: "#fff" } }}
              sx={{ input: { color: "#fff" } }}
            >
              <MenuItem value="M">Masculino</MenuItem>
              <MenuItem value="F">Femenino</MenuItem>
            </TextField>
            <TextField
              select
              name="roleId"
              label="Rol"
              value={form.roleId}
              onChange={handleChange}
              required
              InputLabelProps={{ style: { color: "#fff" } }}
              sx={{ input: { color: "#fff" } }}
            >
              <MenuItem value={1}>Administrador</MenuItem>
              <MenuItem value={2}>Usuario</MenuItem>
            </TextField>
            {error && <Alert severity="error">{error}</Alert>}
            <Button type="submit" variant="contained" sx={{ bgcolor: "#29e6c5" }}>
              {isEdit ? "Modificar Usuario" : "Registrar Usuario"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
