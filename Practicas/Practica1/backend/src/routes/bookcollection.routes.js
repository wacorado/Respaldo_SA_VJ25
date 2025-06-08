// src/routes/bookcollection.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookcollection.controller');
const { authRequired } = require('../middlewares/auth.middleware'); // Protege las rutas

// Agregar libro a colección
router.post('/add', authRequired, controller.addBookToCollection);

// Eliminar libro de colección
router.delete('/remove', authRequired, controller.removeBookFromCollection);

// Listar libros de una colección
router.get('/collection/:collectionId', authRequired, controller.listBooksInCollection);

// Listar colecciones de un libro
router.get('/book/:bookId', authRequired, controller.listCollectionsOfBook);

module.exports = router;
