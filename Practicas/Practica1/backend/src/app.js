// src/app.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { metricsMiddleware, metricsEndpoint } = require('./middlewares/metrics');
const bookRoutes = require('./routes/book.routes');
const collectionRoutes = require('./routes/collection.routes');
const bookCollectionRoutes = require('./routes/bookcollection.routes');
const commentRoutes = require('./routes/comment.routes');
const likeRoutes = require('./routes/like.routes');
const sharedCollectionRoutes = require('./routes/sharecollection.routes');
const readingProgressRoutes = require('./routes/readingprogress.routes');
const userRoutes = require('./routes/user.routes');
const genreRoutes = require('./routes/genre.routes');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rutas de autenticación
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

// Middlewares para rutas protegidas
const { authRequired } = require('./middlewares/auth.middleware');
const { onlyAdmin, onlyUser } = require('./middlewares/role.middleware');

// Ruta pública de prueba
app.get('/', (req, res) => {
  res.send('¡Backend BookShelf API funcionando!');
});

// Ruta protegida solo para administradores
app.get('/api/admin-only', authRequired, onlyAdmin, (req, res) => {
  res.json({ message: 'Solo administradores pueden ver esto.' });
});

// Ruta protegida solo para usuarios normales
app.get('/api/user-only', authRequired, onlyUser, (req, res) => {
  res.json({ message: 'Solo usuarios pueden ver esto.' });
});

//Ruta de métricas
app.use(metricsMiddleware);
app.get('/metrics', metricsEndpoint);

// Rutas de libros
app.use('/api/books', authRequired, bookRoutes);

// Rutas de colecciones
app.use('/api/collections', collectionRoutes);

// Rutas de libros en colecciones
app.use('/api/book-collections', authRequired, bookCollectionRoutes);

// Rutas de comentarios
app.use('/api/comments', authRequired, commentRoutes);

// Rutas de likes
app.use('/api/likes', likeRoutes);

// Rutas de compartir colecciones
app.use('/api/shared-collections', sharedCollectionRoutes);

// Rutas de progreso de lectura
app.use('/api/reading-progress', readingProgressRoutes);

// Rutas de usuarios (solo admin)
app.use('/api/users', authRequired, onlyAdmin, userRoutes);

// Rutas de géneros
app.use('/api/genres', authRequired, genreRoutes);

// Levanta el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en puerto ${PORT}`);
});
