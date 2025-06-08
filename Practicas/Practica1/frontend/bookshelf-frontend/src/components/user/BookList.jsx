// src/components/user/BookList.jsx
import { Box, Paper, Typography, Button, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function BookList({ onEdit }) {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/books", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBooks(res.data);
    } catch {
      setError("No se pudieron cargar los libros.");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Paper sx={{ bgcolor: "#232323", width: "100%", p: 2 }}>
      <Typography variant="h6" color="secondary" mb={2}>
        Mis Libros
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box component="table" sx={{ width: "100%" }}>
        <thead>
          <tr style={{ color: "#fff", background: "#353434" }}>
            <th>Título</th>
            <th>Autor</th>
            <th>Género</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id} style={{ color: "#e0e0e0" }}>
              <td>{book.titulo}</td>
              <td>{book.autor}</td>
              <td>{book.genero?.nombre || ""}</td>
              <td>{book.status}</td>
              <td>
                <Stack direction="row" spacing={1}>
                  <Button variant="outlined" color="secondary" onClick={() => onEdit(book)}>Editar</Button>
                  {/* Aquí puedes poner botón eliminar si quieres */}
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </Box>
    </Paper>
  );
}
