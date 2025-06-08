const Role = require('../models/role');

exports.onlyAdmin = async (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'No autenticado' });

  const role = await Role.findByPk(req.user.role);
  if (!role || role.rol !== 'admin') {
    return res.status(403).json({ error: 'Acceso solo para administradores' });
  }
  next();
};

exports.onlyUser = async (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'No autenticado' });

  const role = await Role.findByPk(req.user.role);
  if (!role || role.rol !== 'user') {
    return res.status(403).json({ error: 'Acceso solo para usuarios' });
  }
  next();
};
