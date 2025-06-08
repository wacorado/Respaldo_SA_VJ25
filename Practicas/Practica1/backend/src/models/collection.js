// src/models/collection.js
const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const User = require('./user');

const Collection = sequelize.define('Collection', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: { type: DataTypes.STRING, allowNull: false },
  usuarioId: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'colecciones',
  timestamps: false,
});

Collection.belongsTo(User, { foreignKey: 'usuarioId', as: 'usuario' });
User.hasMany(Collection, { foreignKey: 'usuarioId', as: 'colecciones' });

module.exports = Collection;
// Este modelo define una colección de libros que pertenece a un usuario.
// La colección tiene un nombre y una referencia al usuario que la posee.
// Se establece una relación uno a muchos entre Usuario y Colección, donde un usuario puede tener múltiples colecciones.
// Además, se define la clave foránea 'usuarioId' que vincula la colección con el usuario correspondiente.