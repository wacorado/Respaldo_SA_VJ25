// src/models/sharecollection.js
const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Collection = require('./collection');
const User = require('./user');

const ShareCollection = sequelize.define('ShareCollection', {
  fecha_compartido: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'compartir_coleccion',
  timestamps: false,
});

// Relación: Una colección compartida con un usuario
ShareCollection.belongsTo(Collection, { foreignKey: 'coleccionId', as: 'coleccion' });
ShareCollection.belongsTo(User, { foreignKey: 'usuarioId', as: 'usuario' });

module.exports = ShareCollection;
