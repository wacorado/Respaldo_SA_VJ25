// src/controllers/bookcollection.controller.js
const Book = require('../models/book');
const Collection = require('../models/collection');
const BookCollection = require('../models/bookcollection');

// Agregar un libro a una colección
exports.addBookToCollection = async (req, res) => {
  try {
    const { collectionId, bookId } = req.body;
    // Evitar duplicados
    const [entry, created] = await BookCollection.findOrCreate({
      where: { collectionId, bookId }
    });
    if (!created) return res.status(400).json({ message: 'El libro ya está en la colección' });
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ message: 'Error al agregar libro a la colección', error: err.message });
  }
};

// Eliminar un libro de una colección
exports.removeBookFromCollection = async (req, res) => {
  try {
    const { collectionId, bookId } = req.body;
    const deleted = await BookCollection.destroy({ where: { collectionId, bookId } });
    if (!deleted) return res.status(404).json({ message: 'No existe ese libro en esa colección' });
    res.json({ message: 'Libro eliminado de la colección' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar libro de la colección', error: err.message });
  }
};

// Listar libros de una colección
exports.listBooksInCollection = async (req, res) => {
  try {
    const { collectionId } = req.params;
    const collection = await Collection.findByPk(collectionId, {
      include: [{ model: Book, as: 'libros' }]
    });
    if (!collection) return res.status(404).json({ message: 'Colección no encontrada' });
    res.json(collection.libros);
  } catch (err) {
    res.status(500).json({ message: 'Error al listar libros de la colección', error: err.message });
  }
};

// Listar colecciones de un libro
exports.listCollectionsOfBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findByPk(bookId, {
      include: [{ model: Collection, as: 'colecciones' }]
    });
    if (!book) return res.status(404).json({ message: 'Libro no encontrado' });
    res.json(book.colecciones);
  } catch (err) {
    res.status(500).json({ message: 'Error al listar colecciones del libro', error: err.message });
  }
};