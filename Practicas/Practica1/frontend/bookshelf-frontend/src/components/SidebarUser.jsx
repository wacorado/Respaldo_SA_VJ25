// src/components/SidebarUser.jsx
import { Drawer, Toolbar, Typography, Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const drawerWidth = 220;

export default function SidebarUser({ selected, onSelect, onLogout }) {
  const items = [
    { key: "libros", label: "Mis Libros" },
    { key: "coleccion", label: "Mis Colecciones" },
    { key: "progresos", label: "Mi Progreso" },
    { key: "logout", label: "Cerrar Sesión" }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: "#242424",
          color: "#f5f5f5"
        },
      }}
    >
      <Toolbar />
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Menú
        </Typography>
        <List>
          {items.map(item =>
            <ListItem key={item.key} disablePadding>
              <ListItemButton
                selected={selected === item.key}
                onClick={() => {
                  if (item.key === "logout") onLogout();
                  else onSelect(item.key);
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Box>
    </Drawer>
  );
}
