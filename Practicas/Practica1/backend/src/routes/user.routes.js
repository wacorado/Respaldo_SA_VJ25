// src/routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authRequired } = require('../middlewares/auth.middleware');
const { onlyAdmin } = require('../middlewares/role.middleware');

// Listar todos los usuarios (solo admin)
router.get('/', authRequired, onlyAdmin, userController.getAllUsers);

// Obtener usuario por ID (solo admin)
router.get('/:id', authRequired, onlyAdmin, userController.getUserById);

// Crear usuario (solo admin, útil para crear desde panel admin)
router.post('/', authRequired, onlyAdmin, userController.createUser);

// Actualizar usuario (solo admin)
router.put('/:id', authRequired, onlyAdmin, userController.updateUser);

// Eliminar usuario (solo admin)
router.delete('/:id', authRequired, onlyAdmin, userController.deleteUser);

module.exports = router;
