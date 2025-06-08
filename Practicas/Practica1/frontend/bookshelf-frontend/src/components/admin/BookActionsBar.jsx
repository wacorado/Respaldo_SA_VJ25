import { Button, Stack } from "@mui/material";

export default function BookActionsBar({ action, setAction, clearEdit }) {
  return (
    <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
      <Button
        variant={action === "list" ? "contained" : "outlined"}
        color="secondary"
        onClick={() => {
          setAction("list");
          clearEdit && clearEdit();
        }}
      >
        Ver Libros
      </Button>
      <Button
        variant={action === "add" ? "contained" : "outlined"}
        color="success"
        onClick={() => {
          setAction("add");
          clearEdit && clearEdit();
        }}
      >
        Agregar Libro
      </Button>
    </Stack>
  );
}
