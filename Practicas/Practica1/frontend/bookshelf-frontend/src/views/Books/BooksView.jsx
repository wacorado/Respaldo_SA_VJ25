import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import BooksTable from '../../components/BooksTable';
import { getBooks } from '../../api/books';

function BooksView() {
  const [books, setBooks] = useState([]);
  useEffect(() => { getBooks().then(setBooks); }, []);

  return (
    <Container>
      <Box mt={4} mb={2}>
        <Typography variant="h4" color="primary">Libros</Typography>
      </Box>
      <BooksTable books={books} />
      <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
        Nuevo Libro
      </Button>
    </Container>
  );
}
export default BooksView;
