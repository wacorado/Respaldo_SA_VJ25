import { Button, Stack } from "@mui/material";
export default function CollectionActionsBar({ action, setAction, clearEdit }) {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant={action === "add" ? "contained" : "outlined"} onClick={() => { setAction("add"); clearEdit(); }}>
        Nueva Colección
      </Button>
      <Button variant={action === "list" ? "contained" : "outlined"} onClick={() => { setAction("list"); clearEdit(); }}>
        Listar Colecciones
      </Button>
    </Stack>
  );
}
