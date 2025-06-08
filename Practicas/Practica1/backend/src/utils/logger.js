// src/utils/logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    // Log a archivo para ELK
    new winston.transports.File({ filename: 'logs/app.log' }),
    // Log a consola para desarrollo
    new winston.transports.Console({ format: winston.format.simple() }),
  ],
});

module.exports = logger;
