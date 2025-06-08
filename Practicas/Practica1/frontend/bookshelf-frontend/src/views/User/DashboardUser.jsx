// src/views/User/DashboardUser.jsx
import React, { useState } from "react";
import { Typography, Paper, Box } from "@mui/material";
import SidebarUser from "../../components/SidebarUser";
import BookActionsBar from "../../components/user/BookActionsBar";
import BookForm from "../../components/user/BookForm";
import BookList from "../../components/user/BookList";

import CollectionActionsBar from "../../components/user/CollectionActionsBar";
import CollectionForm from "../../components/user/CollectionForm";
import CollectionList from "../../components/user/CollectionList";
import ShareList from "../../components/user/ShareList"; // Opcional para compartir colecciones

export default function DashboardUser() {
  const [selected, setSelected] = useState("libros");
  const [bookAction, setBookAction] = useState("list");
  const [bookToEdit, setBookToEdit] = useState(null);

  const [collectionAction, setCollectionAction] = useState("list");
  const [collectionToEdit, setCollectionToEdit] = useState(null);

  // Compartir colecciones
  const [showShare, setShowShare] = useState(false);
  const [collectionIdForShare, setCollectionIdForShare] = useState(null);

  const handleOpenShare = (collId) => {
    setCollectionIdForShare(collId);
    setShowShare(true);
  };
  const handleCloseShare = () => {
    setShowShare(false);
    setCollectionIdForShare(null);
  };

  const userName = "Mi usuario"; // Cambia por el nombre que obtengas de tu auth

  const renderBooks = () => (
    <>
      <BookActionsBar
        action={bookAction}
        setAction={setBookAction}
        clearEdit={() => setBookToEdit(null)}
      />
      <Box sx={{ mt: 3, width: "100%" }}>
        {bookAction === "add" && (
          <BookForm onSuccess={() => setBookAction("list")} />
        )}
        {bookAction === "edit" && (
          <BookForm book={bookToEdit} onSuccess={() => {
            setBookToEdit(null);
            setBookAction("list");
          }} />
        )}
        {bookAction === "list" && (
          <BookList
            onEdit={book => { setBookToEdit(book); setBookAction("edit"); }}
          />
        )}
      </Box>
    </>
  );

  const renderColecciones = () => (
    <>
      <CollectionActionsBar
        action={collectionAction}
        setAction={setCollectionAction}
        clearEdit={() => setCollectionToEdit(null)}
      />
      <Box sx={{ mt: 3, width: "100%" }}>
        {collectionAction === "add" && (
          <CollectionForm onSuccess={() => setCollectionAction("list")} />
        )}
        {collectionAction === "edit" && (
          <CollectionForm collection={collectionToEdit} onSuccess={() => {
            setCollectionToEdit(null);
            setCollectionAction("list");
          }} />
        )}
        {collectionAction === "list" && (
          <CollectionList
            onEdit={coll => { setCollectionToEdit(coll); setCollectionAction("edit"); }}
            onShare={handleOpenShare}
          />
        )}
      </Box>
      {showShare && (
        <Box sx={{
          position: "fixed",
          left: 0, top: 0, width: "100vw", height: "100vh",
          background: "rgba(0,0,0,0.7)", zIndex: 9999,
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <Box sx={{ minWidth: 350, width: 400, p: 3, bgcolor: "#1a1a1a", borderRadius: 2 }}>
            <ShareList coleccionId={collectionIdForShare} usuarios={[]} onSharedChange={handleCloseShare} />
            <Box sx={{ mt: 2, textAlign: "right" }}>
              <button onClick={handleCloseShare} style={{ background: "#a259ce", color: "#fff", border: "none", borderRadius: 4, padding: "6px 16px", cursor: "pointer" }}>
                Cerrar
              </button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const renderContent = () => {
    switch (selected) {
      case "libros":
        return renderBooks();
      case "coleccion":
        return renderColecciones();
      case "progresos":
        return <Typography color="#fff" fontWeight={600}>[Aquí irá tu progreso de lectura]</Typography>;
      default:
        return null;
    }
  };

  const sidebarWidth = 240;

  return (
    <Box sx={{
      minHeight: "100vh",
      width: "100vw",
      background: "#191919",
      display: "flex",
      flexDirection: "row",
      overflow: "hidden",
    }}>
      <SidebarUser
        selected={selected}
        onSelect={setSelected}
        onLogout={handleLogout}
      />
      <Box sx={{
        ml: { xs: "80px", md: `${sidebarWidth}px` },
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}>
        <Paper elevation={0} sx={{
          bgcolor: "#484545",
          borderBottom: "5px solid #a259ce",
          borderRadius: 0,
          p: 3,
          width: "100%",
          minWidth: 0,
        }}>
          <Typography
            variant="h2"
            sx={{
              color: "#f5f5f5",
              fontWeight: 900,
              fontFamily: "Montserrat, serif",
              letterSpacing: 1,
              mb: 0,
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            BookShelf
          </Typography>
          <Typography variant="h5" sx={{ color: "#fff", fontWeight: 700 }}>
            Bienvenido {userName}
          </Typography>
        </Paper>
        <Box sx={{
          background: "#232323",
          flex: 1,
          width: "100%",
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          p: 4,
        }}>
          {renderContent()}
        </Box>
      </Box>
    </Box>
  );
}
