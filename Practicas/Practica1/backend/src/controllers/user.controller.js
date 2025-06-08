// src/controllers/user.controller.js
const User = require('../models/user');
const Role = require('../models/role');
const bcrypt = require('bcryptjs');

// Obtener todos los usuarios (solo admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{ model: Role, as: 'rol', attributes: ['id', 'rol'] }],
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
  }
};

// Obtener usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: Role, as: 'rol', attributes: ['id', 'rol'] }],
      attributes: { exclude: ['password'] }
    });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
  }
};

// Crear usuario (opcional, ya tienes el de register, pero puedes duplicar aquí para admin)
exports.createUser = async (req, res) => {
  try {
    const { nombres, apellidos, fecha_nacimiento, genero, correo, password, roleId } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ nombres, apellidos, fecha_nacimiento, genero, correo, password: hashedPassword, roleId });
    res.status(201).json({ id: user.id, nombres, apellidos, correo, roleId });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear usuario', error: error.message });
  }
};

// Actualizar usuario (solo admin)
exports.updateUser = async (req, res) => {
  try {
    const { nombres, apellidos, fecha_nacimiento, genero, correo, password, roleId } = req.body;
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Si actualiza password
    let hashedPassword = user.password;
    if (password) hashedPassword = await bcrypt.hash(password, 10);

    await user.update({
      nombres,
      apellidos,
      fecha_nacimiento,
      genero,
      correo,
      password: hashedPassword,
      roleId
    });

    res.json({ message: 'Usuario actualizado', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
  }
};

// Eliminar usuario (solo admin)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    await user.destroy();
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
  }
};
