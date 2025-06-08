import { useState, useEffect } from "react";
import { Box, Button, TextField, Paper, MenuItem, Typography, Autocomplete } from "@mui/material";
import axios from "axios";

// Demo: los géneros deberían venir de backend si existen muchos
const genreOptions = [
  { id: 1, label: "Ciencia Ficción" },
  { id: 2, label: "Romance" },
  { id: 3, label: "Terror" },
  { id: 4, label: "Fantasía" },
  { id: 5, label: "Realismo Mágico" },
  { id: 6, label: "Suspenso" }
];
const statusOptions = [
  { value: "leído", label: "Leído" },
  { value: "en progreso", label: "En progreso" },
  { value: "pendiente", label: "Pendiente" }
];

export default function BookForm({ book, onSuccess }) {
  const [form, setForm] = useState({
    titulo: book?.titulo || "",
    autor: book?.autor || "",
    status: book?.status || "pendiente",
    genreId: book?.genero?.id || 1,
    usuarioId: book?.usuario?.id || null, // Nuevo campo
  });
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSelected, setUsuarioSelected] = useState(book?.usuario || null);
  const [error, setError] = useState("");

  // Cargar usuarios desde backend al montar
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:3000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuarios(data);
      } catch {
        setUsuarios([]);
      }
    };
    fetchUsuarios();
  }, []);

  // Actualizar form.usuarioId cuando cambia usuario seleccionado
  useEffect(() => {
    setForm(prev => ({
      ...prev,
      usuarioId: usuarioSelected?.id || null
    }));
  }, [usuarioSelected]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      const token = localStorage.getItem("token");
      const payload = { ...form };
      if (!payload.usuarioId) throw new Error("Debes seleccionar un usuario");
      if (book && book.id) {
        await axios.put(
          `http://localhost:3000/api/books/${book.id}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "http://localhost:3000/api/books",
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      if (onSuccess) onSuccess();
    } catch {
      setError("Error al guardar libro o falta usuario");
    }
  };

  return (
    <Paper sx={{ p: 3, bgcolor: "#232323", width: "100%" }}>
      <Typography variant="h6" color="secondary" mb={2}>
        {book ? "Editar Libro" : "Registrar Libro"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Título"
          name="titulo"
          fullWidth
          margin="normal"
          value={form.titulo}
          onChange={handleChange}
          required
        />
        <TextField
          label="Autor"
          name="autor"
          fullWidth
          margin="normal"
          value={form.autor}
          onChange={handleChange}
          required
        />
        <TextField
          select
          label="Género"
          name="genreId"
          fullWidth
          margin="normal"
          value={form.genreId}
          onChange={handleChange}
          required
        >
          {genreOptions.map(option => (
            <MenuItem key={option.id} value={option.id}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Estado"
          name="status"
          fullWidth
          margin="normal"
          value={form.status}
          onChange={handleChange}
          required
        >
          {statusOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Autocomplete
          options={usuarios}
          getOptionLabel={u =>
            u ? `${u.nombres} ${u.apellidos} (${u.correo})` : ""
          }
          value={usuarioSelected}
          onChange={(_, newValue) => setUsuarioSelected(newValue)}
          renderInput={params => (
            <TextField
              {...params}
              label="Usuario (quien cargará el libro)"
              margin="normal"
              fullWidth
              required
            />
          )}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          filterSelectedOptions
        />
        {error && <Typography color="error" mt={1}>{error}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          {book ? "Actualizar" : "Registrar"}
        </Button>
      </Box>
    </Paper>
  );
}