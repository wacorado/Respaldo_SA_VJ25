const Book = require('../models/book');
const Genre = require('../models/genre');
const User = require('../models/user');

exports.getAll = async () => {
  return Book.findAll({
    include: [
      { model: Genre, as: 'genero' },
      { model: User, as: 'usuario', attributes: ['id', 'nombres', 'apellidos', 'correo'] }
    ]
  });
};

exports.getById = async (id) => {
  return Book.findByPk(id, {
    include: [
      { model: Genre, as: 'genero' },
      { model: User, as: 'usuario', attributes: ['id', 'nombres', 'apellidos', 'correo'] }
    ]
  });
};

exports.create = async (data, usuarioId) => {
  const { titulo, autor, status, genreId } = data;
  return Book.create({ titulo, autor, status, genreId, usuarioId });
};

exports.update = async (id, data, usuarioId, userRole) => {
  const book = await Book.findByPk(id);
  if (!book) throw new Error('Libro no encontrado');
  // Solo admin o dueño puede editar
  if (userRole !== 1 && book.usuarioId !== usuarioId) throw new Error('No autorizado');
  await book.update(data);
  return book;
};

exports.remove = async (id, usuarioId, userRole) => {
  const book = await Book.findByPk(id);
  if (!book) throw new Error('Libro no encontrado');
  // Solo admin o dueño puede borrar
  if (userRole !== 1 && book.usuarioId !== usuarioId) throw new Error('No autorizado');
  await book.destroy();
};