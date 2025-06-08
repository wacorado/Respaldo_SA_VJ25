// src/models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Role = require('./role');

const User = sequelize.define('User', {
  nombres: { type: DataTypes.STRING, allowNull: false },
  apellidos: { type: DataTypes.STRING, allowNull: false },
  fecha_nacimiento: { type: DataTypes.DATEONLY },
  genero: { type: DataTypes.STRING(10) },
  correo: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
}, {
  tableName: 'usuarios',
  timestamps: false,
});

// Relación 1:N Usuario->Rol
User.belongsTo(Role, { foreignKey: 'roleId', as: 'rol' });
Role.hasMany(User, { foreignKey: 'roleId', as: 'usuarios' });

module.exports = User;
