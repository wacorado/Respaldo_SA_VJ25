// src/components/SidebarUser.jsx
import { Drawer, Toolbar, Typography, Box } from "@mui/material";

const drawerWidth = 220;

export default function SidebarUser() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: "background.paper",
          color: "text.primary",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Menú
        </Typography>
        {/* Aquí irán opciones para usuario normal */}
      </Box>
    </Drawer>
  );
}
