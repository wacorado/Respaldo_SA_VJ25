// src/models/genre.js
const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Genre = sequelize.define('Genre', {
  nombre: { type: DataTypes.STRING, allowNull: false, unique: true }
}, {
  tableName: 'generos_libro',
  timestamps: false,
});

module.exports = Genre;
