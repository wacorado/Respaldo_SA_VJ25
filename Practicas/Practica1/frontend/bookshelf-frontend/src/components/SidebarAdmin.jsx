import { Box, Button, Typography, Avatar, Stack } from "@mui/material";
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function SidebarAdmin({ onSelect, onLogout, selected }) {
  const options = [
    { label: "Administrar Usuarios", value: "usuarios" },
    { label: "Administrar Libros", value: "libros" },
    { label: "Administrar Coleccion", value: "coleccion" },
    { label: "Administrar Progresos", value: "progresos" },
  ];

  return (
    <Box
      sx={{
        bgcolor: "#353434",
        minWidth: { xs: 80, md: 220 },
        height: "100vh",
        borderRight: "6px solid #a259ce",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 2,
        pb: 2,
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 100,
      }}
    >
      <Avatar
        sx={{
          bgcolor: "#f5f5f5",
          width: 68,
          height: 68,
          mb: 2,
        }}
      >
        <MenuBookIcon sx={{ fontSize: 48, color: "#6f36b6" }} />
      </Avatar>
      <Typography
        variant="h4"
        sx={{
          color: "#a259ce",
          fontWeight: 700,
          mb: 4,
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        Menu
      </Typography>
      <Stack spacing={2} sx={{ width: "100%" }}>
        {options.map((opt) => (
          <Button
            key={opt.value}
            variant={selected === opt.value ? "contained" : "outlined"}
            onClick={() => onSelect(opt.value)}
            sx={{
              bgcolor: selected === opt.value ? "#30313d" : "#22323a",
              color: "#e0e0e0",
              fontWeight: 600,
              fontSize: "1rem",
              mx: 2,
              borderRadius: 2,
              borderColor: "#a259ce",
              "&:hover": {
                bgcolor: "#6f36b6",
                color: "#fff",
                borderColor: "#a259ce",
              },
            }}
            fullWidth
          >
            {opt.label}
          </Button>
        ))}
      </Stack>
      <Box sx={{ flexGrow: 1 }} />
      <Button
        onClick={onLogout}
        variant="outlined"
        sx={{
          color: "#40e0d0",
          borderColor: "#40e0d0",
          mx: 2,
          mt: 4,
          mb: 1,
          borderRadius: 2,
          fontWeight: 600,
          "&:hover": {
            bgcolor: "#282828",
            borderColor: "#40e0d0",
            color: "#fff",
          },
        }}
        fullWidth
      >
        Cerrar Sesion
      </Button>
    </Box>
  );
}
