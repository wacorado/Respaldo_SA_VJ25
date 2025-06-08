// src/components/user/BookForm.jsx
import { useState, useEffect } from "react";
import { Box, Button, TextField, Paper, MenuItem, Typography } from "@mui/material";
import axios from "axios";

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
    genreId: book?.genero?.id || 1
  });
  const [error, setError] = useState("");
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    // Traer géneros del backend
    const fetchGenres = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/genres", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setGenres(res.data);
      } catch {
        setGenres([]);
      }
    };
    fetchGenres();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (book && book.id) {
        await axios.put(
          `http://localhost:3000/api/books/${book.id}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "http://localhost:3000/api/books",
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      if (onSuccess) onSuccess();
    } catch {
      setError("Error al guardar libro");
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
          {genres.map(option => (
            <MenuItem key={option.id} value={option.id}>
              {option.nombre || option.label}
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
        {error && <Typography color="error" mt={1}>{error}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          {book ? "Actualizar" : "Registrar"}
        </Button>
      </Box>
    </Paper>
  );
}
