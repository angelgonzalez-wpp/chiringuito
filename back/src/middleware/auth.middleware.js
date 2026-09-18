const { verificarToken } = require('../utils/jwt');

const verificarAutenticacion = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const datosUsuario = verificarToken(token);
    req.usuario = datosUsuario;
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
};

const verificarAdmin = (req, res, next) => {
  if (!req.usuario || !req.usuario.es_admin) {
    return res.status(403).json({ mensaje: 'Acceso restringido a administradores' });
  }
  next();
};

module.exports = { verificarAutenticacion, verificarAdmin };
