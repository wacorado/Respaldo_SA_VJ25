// src/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Registro de usuario (público)
router.post('/register', authController.register);

// Login de usuario (público)
router.post('/login', authController.login);

module.exports = router;
