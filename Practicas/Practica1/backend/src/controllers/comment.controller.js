// src/controllers/comment.controller.js
const Comment = require('../models/comment');
const Book = require('../models/book');

exports.createComment = async (req, res) => {
  try {
    const { bookId, content } = req.body;
    const usuarioId = req.user.id;

    // Verifica que el libro exista
    const libro = await Book.findByPk(bookId);
    if (!libro) return res.status(404).json({ message: 'Libro no encontrado' });

    const comentario = await Comment.create({ bookId, usuarioId, content });
    res.status(201).json(comentario);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear comentario', error: error.message });
  }
};

exports.getCommentsByBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const comentarios = await Comment.findAll({
      where: { bookId },
      include: [{ association: 'usuario', attributes: ['id', 'nombres', 'apellidos'] }]
    });
    res.json(comentarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener comentarios', error: error.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.user.id;
    const { content } = req.body;

    const comentario = await Comment.findByPk(id);
    if (!comentario) return res.status(404).json({ message: 'Comentario no encontrado' });
    if (comentario.usuarioId !== usuarioId) return res.status(403).json({ message: 'No puedes editar este comentario' });

    comentario.content = content;
    await comentario.save();
    res.json(comentario);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar comentario', error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.user.id;

    const comentario = await Comment.findByPk(id);
    if (!comentario) return res.status(404).json({ message: 'Comentario no encontrado' });
    if (comentario.usuarioId !== usuarioId) return res.status(403).json({ message: 'No puedes eliminar este comentario' });

    await comentario.destroy();
    res.json({ message: 'Comentario eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar comentario', error: error.message });
  }
};
