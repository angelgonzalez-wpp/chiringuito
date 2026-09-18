const { body } = require('express-validator');

const loginValidator = [
  body('email').trim().notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('El email no tiene un formato válido').normalizeEmail(),
  body('password').notEmpty().withMessage('El password es obligatorio')
];

module.exports = { loginValidator };
