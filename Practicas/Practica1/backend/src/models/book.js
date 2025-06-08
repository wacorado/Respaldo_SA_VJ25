// src/models/book.js
const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const User = require('./user');
const Genre = require('./genre');

const Book = sequelize.define('Book', {
  titulo: { type: DataTypes.STRING, allowNull: false },
  autor: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false }, // Ej: 'leído', 'en progreso'
}, {
  tableName: 'libros',
  timestamps: false,
});

// Relación N:1 Libro->Usuario (propietario)
Book.belongsTo(User, { foreignKey: 'usuarioId', as: 'usuario' });
User.hasMany(Book, { foreignKey: 'usuarioId', as: 'libros' });

// Relación N:1 Libro->Género
Book.belongsTo(Genre, { foreignKey: 'genreId', as: 'genero' });
Genre.hasMany(Book, { foreignKey: 'genreId', as: 'libros' });

module.exports = Book;
