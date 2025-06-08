// src/models/comment.js
const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const User = require('./user');
const Book = require('./book');

const Comment = sequelize.define('Comment', {
  content: { type: DataTypes.TEXT, allowNull: false },
  fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'comentarios',
  timestamps: false,
});

// Relación N:1 Comentario->Usuario
Comment.belongsTo(User, { foreignKey: 'usuarioId', as: 'usuario' });
User.hasMany(Comment, { foreignKey: 'usuarioId', as: 'comentarios' });

// Relación N:1 Comentario->Libro
Comment.belongsTo(Book, { foreignKey: 'bookId', as: 'libro' });
Book.hasMany(Comment, { foreignKey: 'bookId', as: 'comentarios' });

module.exports = Comment;