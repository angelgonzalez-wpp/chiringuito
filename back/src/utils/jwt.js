const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

if (!JWT_SECRET) {
  console.warn('ADVERTENCIA: JWT_SECRET no está definido en el .env.');
}

const generarToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

const verificarToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = { generarToken, verificarToken };
