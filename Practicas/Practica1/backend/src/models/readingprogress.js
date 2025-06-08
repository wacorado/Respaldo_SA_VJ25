// src/models/readingprogress.js
const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const User = require('./user');
const Book = require('./book');

const ReadingProgress = sequelize.define('ReadingProgress', {
  paginas_leidas: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comentario: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'reading_progress',
  timestamps: false
});

// Relación N:1 (un avance pertenece a un usuario)
ReadingProgress.belongsTo(User, { foreignKey: 'usuarioId', as: 'usuario' });
User.hasMany(ReadingProgress, { foreignKey: 'usuarioId', as: 'progresos' });

// Relación N:1 (un avance pertenece a un libro)
ReadingProgress.belongsTo(Book, { foreignKey: 'libroId', as: 'libro' });
Book.hasMany(ReadingProgress, { foreignKey: 'libroId', as: 'progresos' });

module.exports = ReadingProgress;
