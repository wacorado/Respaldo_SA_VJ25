import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

function BooksTable({ books }) {
  return (
    <Paper sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Título</TableCell>
            <TableCell>Autor</TableCell>
            {/* ...agrega más columnas */}
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.id}</TableCell>
              <TableCell>{book.titulo}</TableCell>
              <TableCell>{book.autor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
export default BooksTable;
