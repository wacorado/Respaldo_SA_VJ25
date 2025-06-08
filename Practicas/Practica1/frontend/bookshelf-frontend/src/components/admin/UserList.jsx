import { useEffect, useState } from "react";
import {
  Box, Paper, Typography, Button, Stack, Dialog, DialogTitle, DialogContent,
  DialogActions, CircularProgress
} from "@mui/material";
import axios from "axios";

export default function UserList({ onEdit }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userToDelete, setUserToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Cargar usuarios al montar
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        alert("Error cargando usuarios");
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  // Eliminar usuario
  const handleDelete = async (id) => {
    try {
      setDeleting(true);
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setUserToDelete(null);
    } catch (err) {
      alert("Error al eliminar usuario");
    }
    setDeleting(false);
  };

  return (
    <Paper sx={{ bgcolor: "#232323", width: "100%", p: 2, overflowX: "auto" }}>
      <Typography variant="h6" color="secondary" mb={2}>
        Usuarios Registrados
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box component="table" sx={{ width: "100%", minWidth: 700 }}>
          <thead>
            <tr style={{ color: "#fff", background: "#353434" }}>
              <th>ID</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Correo</th>
              <th>Género</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} style={{ color: "#e0e0e0" }}>
                <td>{user.id}</td>
                <td>{user.nombres}</td>
                <td>{user.apellidos}</td>
                <td>{user.correo}</td>
                <td>{user.genero}</td>
                <td>{user.rol?.rol}</td>
                <td>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => onEdit(user)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => setUserToDelete(user)}
                    >
                      Eliminar
                    </Button>
                  </Stack>
                </td>
              </tr>
            ))}
          </tbody>
        </Box>
      )}

      {/* Diálogo de confirmación para eliminar */}
      <Dialog
        open={Boolean(userToDelete)}
        onClose={() => !deleting && setUserToDelete(null)}
      >
        <DialogTitle>Eliminar usuario</DialogTitle>
        <DialogContent>
          ¿Seguro que deseas eliminar a <b>{userToDelete?.nombres} {userToDelete?.apellidos}</b>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUserToDelete(null)} disabled={deleting}>Cancelar</Button>
          <Button
            color="error"
            onClick={() => handleDelete(userToDelete.id)}
            disabled={deleting}
          >
            {deleting ? <CircularProgress size={18} /> : "Eliminar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
