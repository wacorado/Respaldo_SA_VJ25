// src/components/user/BookActionsBar.jsx
import { Stack, Button } from "@mui/material";

export default function BookActionsBar({ action, setAction, clearEdit }) {
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
        Registrar Libro
      </Button>
      <Button
        variant={action === "list" ? "contained" : "outlined"}
        color="primary"
        onClick={() => {
          clearEdit();
          setAction("list");
        }}
      >
        Listar Libros
      </Button>
    </Stack>
  );
}
