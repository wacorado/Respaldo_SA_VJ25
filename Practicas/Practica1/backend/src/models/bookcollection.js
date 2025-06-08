// src/models/bookcollection.js
const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Book = require('./book');
const Collection = require('./collection');

const BookCollection = sequelize.define('BookCollection', {}, {
  tableName: 'book_collections',
  timestamps: false,
});

// Relación N:N entre Libro y Colección
Book.belongsToMany(Collection, { through: BookCollection, foreignKey: 'bookId', otherKey: 'collectionId', as: 'colecciones' });
Collection.belongsToMany(Book, { through: BookCollection, foreignKey: 'collectionId', otherKey: 'bookId', as: 'libros' });

module.exports = BookCollection;
