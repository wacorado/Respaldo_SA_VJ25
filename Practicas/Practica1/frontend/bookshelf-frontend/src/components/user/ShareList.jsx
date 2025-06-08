// src/components/user/ShareList.jsx
import { Typography, Box } from "@mui/material";

export default function ShareList({ coleccionId, usuarios, onSharedChange }) {
  // Solo muestra info de demo, deberías integrar tu backend de shares aquí
  return (
    <Box>
      <Typography color="secondary">Compartir Colección (en desarrollo)</Typography>
      <Typography color="#fff" mt={1}>Colección ID: {coleccionId}</Typography>
    </Box>
  );
}
