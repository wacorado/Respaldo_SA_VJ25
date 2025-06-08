const collectionService = require('../services/collection.service');

exports.create = async (req, res) => {
  try {
    const { nombre } = req.body;
    const usuarioId = req.user.id;
    const col = await collectionService.create(nombre, usuarioId);
    res.status(201).json(col);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.list = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const cols = await collectionService.list(usuarioId);
    res.json(cols);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const { id } = req.params;
    const col = await collectionService.get(id, usuarioId);
    if (!col) return res.status(404).json({ error: 'Colección no encontrada' });
    res.json(col);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const { id } = req.params;
    const { nombre } = req.body;
    const col = await collectionService.update(id, nombre, usuarioId);
    res.json(col);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const { id } = req.params;
    await collectionService.delete(id, usuarioId);
    res.json({ message: 'Colección eliminada' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Este controlador maneja las operaciones CRUD para las colecciones de libros.