// sharedcollection.routes.js
const express = require('express');
const router = express.Router();
const controller = require('../controllers/sharecollection.controller');
const { authRequired } = require('../middlewares/auth.middleware'); // Igual que en likes

router.post('/share', authRequired, controller.shareCollection);
router.get('/user/:usuarioId', authRequired, controller.getSharedCollections);
router.delete('/unshare', authRequired, controller.unshareCollection);

module.exports = router;
