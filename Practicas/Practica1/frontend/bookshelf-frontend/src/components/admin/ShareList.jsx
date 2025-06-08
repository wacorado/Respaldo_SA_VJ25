// src/components/admin/ShareList.jsx
import { useEffect, useState } from "react";
import { Box, Typography, IconButton, Stack, Paper } from "@mui/material";
import { getSharedCollectionsByUser, shareCollection, unshareCollection } from "../../api/sharecollections";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ShareList({ coleccionId, usuarios, onSharedChange }) {
  const [shared, setShared] = useState([]);
  const [usuarioId, setUsuarioId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Cargar los usuarios con quienes está compartida la colección
    if (coleccionId) {
      fetchShared();
    }
  }, [coleccionId]);

  const fetchShared = async () => {
    try {
      // Puedes traer con getSharedCollectionsByUser, o endpoint propio para colección.
      // Aquí asumimos tienes un endpoint tipo /api/shared-collections/collection/:id
      // Pero puedes ajustar según tu backend.
      // const data = await getSharedCollectionsByUser(coleccionId);
      // setShared(data);
      setShared([]); // Demo: aquí iría la consulta real
    } catch {
      setError("Error cargando compartidos");
    }
  };

  const handleShare = async () => {
    setError("");
    if (!usuarioId) {
      setError("Debes seleccionar un usuario");
      return;
    }
    try {
      await shareCollection(coleccionId, usuarioId);
      fetchShared();
      if (onSharedChange) onSharedChange();
    } catch {
      setError("No se pudo compartir");
    }
  };

  const handleUnshare = async (usuarioIdQuitar) => {
    if (window.confirm("¿Quitar acceso a este usuario?")) {
      try {
        await unshareCollection(coleccionId, usuarioIdQuitar);
        fetchShared();
        if (onSharedChange) onSharedChange();
      } catch {
        setError("No se pudo quitar acceso");
      }
    }
  };

  return (
    <Paper sx={{ p: 2, bgcolor: "#252525", mt: 2 }}>
      <Typography color="secondary" variant="subtitle1" mb={1}>
        Compartido con:
      </Typography>
      {shared.length === 0 && (
        <Typography color="#bbb" fontSize="0.95rem">No está compartida con nadie aún.</Typography>
      )}
      <Stack direction="column" spacing={1}>
        {shared.map(s => (
          <Box key={s.usuario.id} sx={{ display: "flex", alignItems: "center", color: "#fff" }}>
            <Typography sx={{ flex: 1 }}>
              {s.usuario.nombres} {s.usuario.apellidos} ({s.usuario.email})
            </Typography>
            <IconButton size="small" color="error" onClick={() => handleUnshare(s.usuario.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Stack>
      {/* Selector para compartir (puedes mejorarlo con Autocomplete) */}
      <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
        <select
          style={{ flex: 1, padding: 8, borderRadius: 4, marginRight: 8 }}
          value={usuarioId}
          onChange={e => setUsuarioId(e.target.value)}
        >
          <option value="">Seleccionar usuario para compartir</option>
          {usuarios?.map(user => (
            <option key={user.id} value={user.id}>
              {user.nombres} {user.apellidos} ({user.email})
            </option>
          ))}
        </select>
        <button onClick={handleShare}>Compartir</button>
      </Box>
      {error && <Typography color="error">{error}</Typography>}
    </Paper>
  );
}
