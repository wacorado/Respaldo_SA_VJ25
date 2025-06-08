// src/models/db.js
require('dotenv').config(); // Esto carga las variables de entorno de tu archivo .env

// Depuración: imprime los valores de las variables de entorno (NUNCA pongas esto en producción)
console.log('DB_USER:', process.env.DB_USER, typeof process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD, typeof process.env.DB_PASSWORD);
console.log('DB_HOST:', process.env.DB_HOST, typeof process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT, typeof process.env.DB_PORT);
console.log('DB_NAME:', process.env.DB_NAME, typeof process.env.DB_NAME);

const { Sequelize } = require('sequelize');

// Instancia de Sequelize usando variables de entorno
const sequelize = new Sequelize(
  process.env.DB_NAME,        // nombre de la base de datos
  process.env.DB_USER,        // usuario
  process.env.DB_PASSWORD,    // contraseña
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,           // pon true para ver queries en consola
  }
);

module.exports = sequelize;
