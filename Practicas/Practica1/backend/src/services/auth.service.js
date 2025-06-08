const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Role = require('../models/role');

exports.register = async (data) => {
  const { nombres, apellidos, fecha_nacimiento, genero, correo, password, roleId } = data;

  // Verificar si el correo ya existe
  const userExists = await User.findOne({ where: { correo } });
  if (userExists) throw new Error('El correo ya está registrado.');

  // Verificar que el rol existe
  const role = await Role.findByPk(roleId);
  if (!role) throw new Error('Rol no válido.');

  // Encriptar contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear usuario
  const user = await User.create({
    nombres, apellidos, fecha_nacimiento, genero, correo,
    password: hashedPassword,
    roleId
  });

  return { id: user.id, nombres, apellidos, correo, role: role.rol };
};

exports.login = async (data) => {
  const { correo, password } = data;

  // Buscar usuario
  const user = await User.findOne({ where: { correo }, include: [{ model: Role, as: 'rol' }] });
  if (!user) throw new Error('Credenciales inválidas.');

  // Verificar password
  const passwordOK = await bcrypt.compare(password, user.password);
  if (!passwordOK) throw new Error('Credenciales inválidas.');

  // Crear token JWT
  const token = jwt.sign({
    id: user.id,
    role: user.roleId,
    correo: user.correo
  }, process.env.JWT_SECRET, { expiresIn: '8h' });

  return {
    token,
    user: {
      id: user.id,
      nombres: user.nombres,
      apellidos: user.apellidos,
      correo: user.correo,
      rol: user.rol.rol
    }
  };
};