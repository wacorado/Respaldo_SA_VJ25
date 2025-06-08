// src/components/user/CollectionForm.jsx
import { useState, useEffect } from "react";
import { Box, Button, TextField, Paper, Typography, MenuItem } from "@mui/material";
import axios from "axios";

export default function CollectionForm({ collection, onSuccess }) {
  const [form, setForm] = useState({
    nombre: collection?.nombre || "",
    libros: collection?.libros || []
  });
  const [error, setError] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Traer libros del usuario
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/books", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBooks(res.data);
      } catch {
        setBooks([]);
      }
    };
    fetchBooks();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBooksChange = e => {
    const value = Array.from(e.target.selectedOptions, option => Number(option.value));
    setForm({ ...form, libros: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      const token = localStorage.getItem("token");
      const payload = {
        nombre: form.nombre,
        libros: form.libros
      };
      if (collection && collection.id) {
        await axios.put(
          `http://localhost:3000/api/collections/${collection.id}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "http://localhost:3000/api/collections",
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      if (onSuccess) onSuccess();
    } catch {
      setError("Error al guardar colección");
    }
  };

  return (
    <Paper sx={{ p: 3, bgcolor: "#232323", width: "100%" }}>
      <Typography variant="h6" color="secondary" mb={2}>
        {collection ? "Editar Colección" : "Registrar Colección"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          name="nombre"
          fullWidth
          margin="normal"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <TextField
          select
          label="Libros"
          name="libros"
          fullWidth
          margin="normal"
          SelectProps={{ multiple: true, native: true }}
          value={form.libros}
          onChange={handleBooksChange}
        >
          {books.map(book => (
            <option key={book.id} value={book.id}>
              {book.titulo}
            </option>
          ))}
        </TextField>
        {error && <Typography color="error" mt={1}>{error}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          {collection ? "Actualizar" : "Registrar"}
        </Button>
      </Box>
    </Paper>
  );
}
