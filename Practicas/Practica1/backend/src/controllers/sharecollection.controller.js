// src/controllers/sharecollection.controller.js
const ShareCollection = require('../models/sharecollection');
const Collection = require('../models/collection');
const User = require('../models/user');

// Compartir una colección con un usuario
exports.shareCollection = async (req, res) => {
  try {
    const { coleccionId, usuarioId } = req.body;

    // Validar que existan
    const coleccion = await Collection.findByPk(coleccionId);
    const usuario = await User.findByPk(usuarioId);

    if (!coleccion) return res.status(404).json({ message: 'Colección no existe' });
    if (!usuario) return res.status(404).json({ message: 'Usuario no existe' });

    // Evitar compartir dos veces
    const existente = await ShareCollection.findOne({ where: { coleccionId, usuarioId } });
    if (existente) return res.status(400).json({ message: 'Ya fue compartida esta colección con este usuario' });

    const compartido = await ShareCollection.create({ coleccionId, usuarioId });
    res.status(201).json(compartido);
  } catch (error) {
    res.status(500).json({ message: 'Error al compartir colección', error: error.message });
  }
};

// Ver colecciones compartidas con un usuario
exports.getSharedCollections = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const colecciones = await ShareCollection.findAll({
      where: { usuarioId },
      include: [{ association: 'coleccion' }]
    });
    res.json(colecciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener colecciones', error: error.message });
  }
};

// Eliminar una colección compartida (dejar de compartir)
exports.unshareCollection = async (req, res) => {
  try {
    const { coleccionId, usuarioId } = req.body;
    const compartido = await ShareCollection.findOne({ where: { coleccionId, usuarioId } });
    if (!compartido) return res.status(404).json({ message: 'No estaba compartida' });

    await compartido.destroy();
    res.json({ message: 'Colección ya no está compartida' });
  } catch (error) {
    res.status(500).json({ message: 'Error al dejar de compartir', error: error.message });
  }
};
