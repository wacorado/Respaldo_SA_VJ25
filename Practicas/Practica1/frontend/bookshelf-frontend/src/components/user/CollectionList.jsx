// src/components/user/CollectionList.jsx
import { Box, Paper, Typography, Button, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CollectionList({ onEdit, onShare }) {
  const [collections, setCollections] = useState([]);
  const [error, setError] = useState("");

  const fetchCollections = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/api/collections", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCollections(res.data);
    } catch {
      setError("No se pudieron cargar las colecciones.");
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <Paper sx={{ bgcolor: "#232323", width: "100%", p: 2 }}>
      <Typography variant="h6" color="secondary" mb={2}>
        Mis Colecciones
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box component="table" sx={{ width: "100%" }}>
        <thead>
          <tr style={{ color: "#fff", background: "#353434" }}>
            <th>Nombre</th>
            <th>Libros</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {collections.map(coll => (
            <tr key={coll.id} style={{ color: "#e0e0e0" }}>
              <td>{coll.nombre}</td>
              <td>
                {coll.librosColeccion && coll.librosColeccion.length > 0
                  ? coll.librosColeccion.map(lc => lc.libro?.titulo).join(", ")
                  : "Sin libros"}
              </td>
              <td>
                <Stack direction="row" spacing={1}>
                  <Button variant="outlined" color="secondary" onClick={() => onEdit(coll)}>Editar</Button>
                  {onShare && <Button variant="outlined" color="primary" onClick={() => onShare(coll.id)}>Compartir</Button>}
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </Box>
    </Paper>
  );
}
