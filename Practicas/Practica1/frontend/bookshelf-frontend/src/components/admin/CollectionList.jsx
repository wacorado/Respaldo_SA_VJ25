import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Collapse,
  Button,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import axios from "axios";

export default function CollectionList({ onEdit, onDelete }) {
  const [collections, setCollections] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [booksByCollection, setBooksByCollection] = useState({});

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        "http://localhost:3000/api/collections",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCollections(data);
    } catch {
      setCollections([]);
    }
  };

  const fetchBooks = async (collectionId) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://localhost:3000/api/book-collections/collection/${collectionId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBooksByCollection((prev) => ({
        ...prev,
        [collectionId]: data,
      }));
    } catch {
      setBooksByCollection((prev) => ({
        ...prev,
        [collectionId]: [],
      }));
    }
  };

  const handleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    if (!booksByCollection[id]) fetchBooks(id);
  };

  return (
    <Paper sx={{ bgcolor: "#232323", p: 3, width: "100%" }}>
      <Typography variant="h6" color="secondary" mb={2}>
        Colecciones Registradas
      </Typography>
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <table style={{ width: "100%", color: "#fff", background: "transparent" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Usuario ID</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {collections.map((col) => (
              <React.Fragment key={col.id}>
                <tr>
                  <td>{col.id}</td>
                  <td>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton
                        onClick={() => handleExpand(col.id)}
                        size="small"
                        sx={{ color: "#fff" }}
                      >
                        {expanded[col.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                      {col.nombre}
                    </Box>
                  </td>
                  <td>{col.usuarioId}</td>
                  <td>
                    <Button color="primary" variant="outlined" size="small"
                      onClick={() => onEdit && onEdit(col)}>
                      Editar
                    </Button>
                    &nbsp;
                    <Button color="error" variant="outlined" size="small"
                      onClick={() => onDelete && onDelete(col)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td colSpan={4} style={{ padding: 0 }}>
                    <Collapse in={!!expanded[col.id]} timeout="auto" unmountOnExit>
                      <Box sx={{ bgcolor: "#292929", p: 2, ml: 6, borderRadius: 1 }}>
                        <Typography variant="subtitle1" color="secondary" mb={1}>
                          Libros en la colección:
                        </Typography>
                        <List dense>
                          {(booksByCollection[col.id] && booksByCollection[col.id].length) ? (
                            booksByCollection[col.id].map((book) => (
                              <ListItem key={book.id}>
                                <ListItemText
                                  primary={`${book.titulo} (${book.autor})`}
                                  secondary={`Género: ${book.genero?.nombre ?? book.genreId ?? "?"}`}
                                />
                              </ListItem>
                            ))
                          ) : (
                            <ListItem>
                              <ListItemText primary="Sin libros" />
                            </ListItem>
                          )}
                        </List>
                      </Box>
                    </Collapse>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </Box>
    </Paper>
  );
}
