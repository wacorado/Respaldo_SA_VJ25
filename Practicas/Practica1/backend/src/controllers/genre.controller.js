// src/controllers/genre.controller.js
const Genre = require('../models/genre');

exports.getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.findAll({
      attributes: ['id', 'nombre'],
      order: [['nombre', 'ASC']]
    });
    res.json(genres);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo géneros', details: err.message });
  }
};
exports.getGenreById = async (req, res) => {
  const { id } = req.params;
  try {
    const genre = await Genre.findByPk(id, {
      attributes: ['id', 'nombre']
    });
    if (!genre) {
      return res.status(404).json({ error: 'Género no encontrado' });
    }
    res.json(genre);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo género', details: err.message });
  }
};
exports.createGenre = async (req, res) => {
  const { nombre } = req.body;
  try {
    const newGenre = await Genre.create({ nombre });
    res.status(201).json(newGenre);
  } catch (err) {
    res.status(500).json({ error: 'Error creando género', details: err.message });
  }
};
exports.updateGenre = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const genre = await Genre.findByPk(id);
    if (!genre) {
      return res.status(404).json({ error: 'Género no encontrado' });
    }
    genre.nombre = nombre;
    await genre.save();
    res.json(genre);
  } catch (err) {
    res.status(500).json({ error: 'Error actualizando género', details: err.message });
  }
};
exports.deleteGenre = async (req, res) => {
  const { id } = req.params;
  try {
    const genre = await Genre.findByPk(id);
    if (!genre) {
      return res.status(404).json({ error: 'Género no encontrado' });
    }
    await genre.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error eliminando género', details: err.message });
  }
};