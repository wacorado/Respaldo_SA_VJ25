const Collection = require('../models/collection');

exports.create = async (nombre, usuarioId) => {
  return await Collection.create({ nombre, usuarioId });
};

exports.list = async (usuarioId) => {
  return await Collection.findAll({ where: { usuarioId } });
};

exports.get = async (id, usuarioId) => {
  return await Collection.findOne({ where: { id, usuarioId } });
};

exports.update = async (id, nombre, usuarioId) => {
  const col = await Collection.findOne({ where: { id, usuarioId } });
  if (!col) throw new Error('Colección no encontrada');
  col.nombre = nombre;
  await col.save();
  return col;
};

exports.delete = async (id, usuarioId) => {
  const deleted = await Collection.destroy({ where: { id, usuarioId } });
  if (!deleted) throw new Error('Colección no encontrada');
  return true;
};