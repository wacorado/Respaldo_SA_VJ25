const bookService = require('../services/book.service');

exports.getAll = async (req, res) => {
  const books = await bookService.getAll();
  res.json(books);
};

exports.getById = async (req, res) => {
  const book = await bookService.getById(req.params.id);
  if (!book) return res.status(404).json({ error: 'Libro no encontrado' });
  res.json(book);
};

exports.create = async (req, res) => {
  try {
    const book = await bookService.create(req.body, req.user.id);
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const book = await bookService.update(req.params.id, req.body, req.user.id, req.user.role);
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await bookService.remove(req.params.id, req.user.id, req.user.role);
    res.json({ message: 'Libro eliminado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
