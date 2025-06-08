// src/routes/comment.routes.js
const { Router } = require('express');
const controller = require('../controllers/comment.controller');
const { authRequired } = require('../middlewares/auth.middleware');

const router = Router();

router.post('/', authRequired, controller.createComment);                   // Crear comentario
router.get('/book/:bookId', controller.getCommentsByBook);                  // Obtener comentarios de un libro
router.put('/:id', authRequired, controller.updateComment);                 // Editar comentario
router.delete('/:id', authRequired, controller.deleteComment);              // Eliminar comentario

module.exports = router;
