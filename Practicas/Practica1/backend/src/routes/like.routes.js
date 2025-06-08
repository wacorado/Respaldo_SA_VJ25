// src/routes/like.routes.js
const express = require('express');
const router = express.Router();
const likeController = require('../controllers/like.controller');
const { authRequired } = require('../middlewares/auth.middleware');

// Crear un like
router.post('/', authRequired, likeController.addLike);

// Listar likes de un libro
router.get('/book/:bookId', likeController.getLikesByBook);

// Quitar like
router.delete('/', authRequired, likeController.removeLike);

// (Opcional) Listar likes de usuario autenticado
router.get('/my', authRequired, likeController.getLikesByUser);

module.exports = router;
