const { body, param } = require('express-validator');

const crearUsuarioValidator = [
  body('nombre').trim().notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres'),
  body('email').trim().notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('El email no tiene un formato válido').normalizeEmail(),
  body('password').notEmpty().withMessage('El password es obligatorio')
    .isLength({ min: 6 }).withMessage('El password debe tener al menos 6 caracteres'),
  body('es_admin').optional().isBoolean().withMessage('es_admin debe ser true o false')
];

const actualizarUsuarioValidator = [
  param('id').isInt({ min: 1 }).withMessage('El id debe ser un número entero válido'),
  body('nombre').trim().notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres'),
  body('email').trim().notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('El email no tiene un formato válido').normalizeEmail(),
  body('password').optional().isLength({ min: 6 }).withMessage('El password debe tener al menos 6 caracteres'),
  body('es_admin').optional().isBoolean().withMessage('es_admin debe ser true o false')
];

const idUsuarioValidator = [
  param('id').isInt({ min: 1 }).withMessage('El id debe ser un número entero válido')
];

module.exports = { crearUsuarioValidator, actualizarUsuarioValidator, idUsuarioValidator };
