const express = require('express');
const router = express.Router();
const controller = require('../controllers/readingprogress.controller');
const { authRequired } = require('../middlewares/auth.middleware');

// Registrar avance de lectura
router.post('/', authRequired, controller.addProgress);

router.get('/my', authRequired, controller.getUserProgress);

module.exports = router;
