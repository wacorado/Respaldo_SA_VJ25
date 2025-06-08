// src/components/user/CollectionActionsBar.jsx
import { Stack, Button } from "@mui/material";

export default function CollectionActionsBar({ action, setAction, clearEdit }) {
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant={action === "add" ? "contained" : "outlined"}
        color="secondary"
        onClick={() => {
          clearEdit();
          setAction("add");
        }}
      >
        Registrar Colección
      </Button>
      <Button
        variant={action === "list" ? "contained" : "outlined"}
        color="primary"
        onClick={() => {
          clearEdit();
          setAction("list");
        }}
      >
        Listar Colecciones
      </Button>
    </Stack>
  );
}
