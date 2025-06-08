const router = require('express').Router();
const controller = require('../controllers/collection.controller');
const { authRequired } = require('../middlewares/auth.middleware');

router.use(authRequired);

router.get('/', controller.list);
router.get('/:id', controller.get);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
// Este archivo define las rutas para manejar las colecciones de libros.