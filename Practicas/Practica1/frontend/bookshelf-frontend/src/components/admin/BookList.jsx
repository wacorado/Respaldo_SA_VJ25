// src/components/admin/BookList.jsx
import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";

const API_URL = "http://localhost:3000/api/books";
const API_USERS = "http://localhost:3000/api/users"; // Ajusta según tu ruta real

export default function BookList({ onEdit, onDelete }) {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [filterUserId, setFilterUserId] = useState("all");

  // Obtener libros
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooks(res.data);
      } catch (e) {
        setBooks([]);
      }
    };
    fetchBooks();
  }, []);

  // Obtener usuarios
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(API_USERS, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (e) {
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);

  // Filtrado de libros por usuario
  const filteredBooks =
    filterUserId === "all"
      ? books
      : books.filter((book) => book.usuario?.id === filterUserId);

  return (
    <Paper sx={{ bgcolor: "#232323", width: "100%", p: 2 }}>
      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
        <Typography variant="h6" color="secondary">
          Libros Registrados
        </Typography>
        <FormControl sx={{ minWidth: 220 }}>
          <InputLabel sx={{ color: "#a259ce" }}>Filtrar por usuario</InputLabel>
          <Select
            value={filterUserId}
            onChange={(e) => setFilterUserId(e.target.value)}
            sx={{
              color: "#fff",
              ".MuiOutlinedInput-notchedOutline": { borderColor: "#a259ce" },
            }}
            label="Filtrar por usuario"
          >
            <MenuItem value="all">Todos</MenuItem>
            {users.map((u) => (
              <MenuItem value={u.id} key={u.id}>
                {u.nombres} {u.apellidos} ({u.correo})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Box component="table" sx={{ width: "100%" }}>
        <thead>
          <tr style={{ color: "#fff", background: "#353434" }}>
            <th>ID</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Género</th>
            <th>Estado</th>
            <th>Registrado por</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map((book) => (
            <tr key={book.id} style={{ color: "#e0e0e0" }}>
              <td>{book.id}</td>
              <td>{book.titulo}</td>
              <td>{book.autor}</td>
              <td>{book.genero?.nombre || "-"}</td>
              <td>{book.status}</td>
              <td>
                {book.usuario
                  ? `${book.usuario.nombres} ${book.usuario.apellidos} (${book.usuario.correo})`
                  : "Desconocido"}
              </td>
              <td>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => onEdit(book)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => onDelete(book)}
                  >
                    Eliminar
                  </Button>
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </Box>
    </Paper>
  );
}
