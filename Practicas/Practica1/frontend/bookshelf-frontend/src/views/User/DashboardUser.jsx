// src/views/User/DashboardUser.jsx
import { Button, Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function DashboardUser() {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      {/* Menú lateral */}
      <Box
        component="nav"
        sx={{
          width: { xs: "64px", sm: "180px", md: "220px" },
          minWidth: "64px",
          maxWidth: "240px",
          bgcolor: "background.paper",
          px: { xs: 1, sm: 2 },
          py: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: {
            xs: "none",
            sm: `2px 0 8px 0 ${theme.palette.mode === "dark" ? "#1117" : "#ccc"}`,
          },
          height: "100vh",
          position: "sticky",
          top: 0,
        }}
      >
        <Typography variant="h6" sx={{ mb: 4, fontWeight: 700 }}>
          Menú
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleLogout}
          sx={{
            mb: 2,
            width: "100%",
            minWidth: "100px",
            color: "secondary.main",
            borderColor: "secondary.main",
            "&:hover": {
              bgcolor: "secondary.dark",
              color: "#fff",
              borderColor: "secondary.dark",
            },
          }}
        >
          Cerrar sesión
        </Button>
      </Box>

      {/* Contenido principal */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: { xs: "stretch", sm: "center" },
          minHeight: "100vh",
          px: { xs: 2, sm: 4 },
          py: { xs: 4, sm: 0 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "520px",
            mx: { xs: "auto", sm: 0 },
            textAlign: { xs: "left", sm: "center" },
          }}
        >
          <Typography variant="h2" color="primary" gutterBottom sx={{ fontWeight: 700, fontSize: { xs: 34, sm: 44 } }}>
            Dashboard Usuario
          </Typography>
          <Typography sx={{ fontSize: 20, color: "text.secondary", mb: 2 }}>
            ¡Bienvenido a tu panel de usuario!
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
