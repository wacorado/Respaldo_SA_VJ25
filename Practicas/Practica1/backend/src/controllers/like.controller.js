// src/controllers/like.controller.js
const Like = require('../models/like');
const Book = require('../models/book');

// Agregar un like a un libro
exports.addLike = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.id;

    // Verifica que el libro exista
    const libro = await Book.findByPk(bookId);
    if (!libro) return res.status(404).json({ message: 'Libro no encontrado' });

    // Verifica si el usuario ya dio like a este libro
    const likeExistente = await Like.findOne({ where: { userId, bookId } });
    if (likeExistente) return res.status(400).json({ message: 'Ya diste like a este libro' });

    const like = await Like.create({ userId, bookId });
    res.status(201).json(like);
  } catch (error) {
    res.status(500).json({ message: 'Error al dar like', error: error.message });
  }
};

// Obtener todos los likes de un libro
exports.getLikesByBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const likes = await Like.findAll({
      where: { bookId },
      include: [{ association: 'usuario', attributes: ['id', 'nombres', 'apellidos'] }]
    });
    res.json(likes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener likes', error: error.message });
  }
};

// Quitar el like (unlike)
exports.removeLike = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.id;

    const like = await Like.findOne({ where: { userId, bookId } });
    if (!like) return res.status(404).json({ message: 'No existe like para eliminar' });

    await like.destroy();
    res.json({ message: 'Like eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar like', error: error.message });
  }
};

// (Opcional) Obtener todos los likes de un usuario
exports.getLikesByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const likes = await Like.findAll({
      where: { userId },
      include: [{ association: 'libro', attributes: ['id', 'titulo', 'autor'] }]
    });
    res.json(likes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener likes', error: error.message });
  }
};