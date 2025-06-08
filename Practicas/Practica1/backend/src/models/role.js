// src/models/role.js
const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Role = sequelize.define('Role', {
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'roles',
  timestamps: false,
});

module.exports = Role;
