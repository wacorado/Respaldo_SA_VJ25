import { Box, Typography, List, ListItem, Divider } from "@mui/material";

export default function BookListInCollection({ libros }) {
  if (!libros || !libros.length)
    return <Typography color="secondary" sx={{ mt: 1, mb: 1 }}>Esta colección no tiene libros.</Typography>;

  return (
    <Box>
      <Typography color="secondary" fontWeight={700} sx={{ mt: 1 }}>Libros:</Typography>
      <List>
        {libros.map(book => (
          <div key={book.id}>
            <ListItem>
              <Typography sx={{ color: "#fff" }}>
                <b>{book.titulo}</b> - {book.autor}
              </Typography>
            </ListItem>
            <Divider sx={{ bgcolor: "#444" }} />
          </div>
        ))}
      </List>
    </Box>
  );
}
