// src/controllers/readingprogress.controller.js
const ReadingProgress = require('../models/readingprogress');
const Book = require('../models/book');

exports.addProgress = async (req, res) => {
  try {
    const { libroId, paginas_leidas, comentario } = req.body;
    const usuarioId = req.user.id;

    // Validar que el libro exista y sea del usuario
    const libro = await Book.findByPk(libroId);
    if (!libro) return res.status(404).json({ message: 'Libro no encontrado' });

    // Crear avance de lectura
    const progreso = await ReadingProgress.create({
      usuarioId,
      libroId,
      paginas_leidas,
      comentario
    });

    res.status(201).json(progreso);
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar avance', error: error.message });
  }
};

exports.getUserProgress = async (req, res) => {
  try {
    const usuarioId = req.user.id; // viene del JWT (authRequired)
    const progresos = await ReadingProgress.findAll({
      where: { usuarioId },
      include: [
        { association: 'libro', attributes: ['id', 'titulo', 'autor'] }
      ],
      order: [['fecha', 'DESC']]
    });
    res.json(progresos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener historial', error: error.message });
  }
};