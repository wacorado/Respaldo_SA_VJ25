// src/sync.js
const sequelize = require('./models/db');
require('./models/role');
require('./models/user');
require('./models/genre');
require('./models/book');
require('./models/collection');
require('./models/bookcollection');
require('./models/sharecollection');
require('./models/comment');
require('./models/like');
require('./models/readingprogress');


sequelize.sync({ alter: true })
  .then(() => {
    console.log('Todas las tablas están sincronizadas con la base de datos correctamente.');
    process.exit(0);
  })
  .catch(error => {
    console.error('Error al sincronizar tablas:', error);
    process.exit(1);
  });
