import { useState, useEffect } from "react";
import { Box, Button, TextField, Paper, MenuItem, Typography, Autocomplete } from "@mui/material";
import { createCollection, updateCollection } from "../../api/collections";
import { getUsers } from "../../api/users";
import { getBooks } from "../../api/books";

export default function CollectionForm({ collection, onSuccess }) {
  const [form, setForm] = useState({
    nombre: collection?.nombre || "",
    usuarioId: collection?.usuarioId || "",
    libros: collection?.libros || []
  });
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState(collection?.libros || []);
  const [error, setError] = useState("");

  useEffect(() => {
    getUsers().then(setUsers);
    getBooks().then(setBooks);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBooksChange = (e, value) => {
    setSelectedBooks(value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      const data = { ...form, libros: selectedBooks.map(book => book.id) };
      if (collection && collection.id) {
        await updateCollection(collection.id, data);
      } else {
        await createCollection(data);
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      setError("Error al guardar colección");
    }
  };

  return (
    <Paper sx={{ p: 3, bgcolor: "#232323", width: "100%" }}>
      <Typography variant="h6" color="secondary" mb={2}>
        {collection ? "Editar Colección" : "Registrar Colección"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField label="Nombre" name="nombre" fullWidth margin="normal" value={form.nombre} onChange={handleChange} required />
        <TextField select label="Usuario dueño" name="usuarioId" fullWidth margin="normal" value={form.usuarioId} onChange={handleChange} required>
          {users.map(user => (
            <MenuItem key={user.id} value={user.id}>{user.nombres} {user.apellidos}</MenuItem>
          ))}
        </TextField>
        <Autocomplete
          multiple
          options={books}
          getOptionLabel={option => option.titulo}
          value={selectedBooks}
          onChange={handleBooksChange}
          isOptionEqualToValue={(opt, val) => opt.id === val.id}
          renderInput={params => <TextField {...params} label="Libros en colección" margin="normal" />}
        />
        {error && <Typography color="error" mt={1}>{error}</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          {collection ? "Actualizar" : "Registrar"}
        </Button>
      </Box>
    </Paper>
  );
}
