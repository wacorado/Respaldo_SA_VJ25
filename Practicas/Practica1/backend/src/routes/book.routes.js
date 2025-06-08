const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');
const { authRequired } = require('../middlewares/auth.middleware');

router.get('/', bookController.getAll);
router.get('/:id', bookController.getById);
router.post('/', authRequired, bookController.create);
router.put('/:id', authRequired, bookController.update);
router.delete('/:id', authRequired, bookController.remove);

module.exports = router;
