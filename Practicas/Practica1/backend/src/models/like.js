// src/models/like.js
const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const User = require('./user');
const Book = require('./book');

const Like = sequelize.define('Like', {}, {
  tableName: 'likes',
  timestamps: false,
});

// Relación N:1 Like->Usuario
Like.belongsTo(User, { foreignKey: 'userId', as: 'usuario' });
User.hasMany(Like, { foreignKey: 'userId', as: 'likes' });

// Relación N:1 Like->Libro
Like.belongsTo(Book, { foreignKey: 'bookId', as: 'libro' });
Book.hasMany(Like, { foreignKey: 'bookId', as: 'likes' });

module.exports = Like;
