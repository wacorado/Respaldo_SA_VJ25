// src/components/admin/UserActionsBar.jsx
import { Button, Stack } from "@mui/material";

export default function UserActionsBar({ action, setAction, clearEdit }) {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant={action === "add" ? "contained" : "outlined"}
        color="secondary"
        onClick={() => { setAction("add"); clearEdit(); }}
      >
        Agregar Usuario
      </Button>
      <Button
        variant={action === "list" ? "contained" : "outlined"}
        color="secondary"
        onClick={() => { setAction("list"); clearEdit(); }}
      >
        Listar Usuarios
      </Button>
    </Stack>
  );
}
