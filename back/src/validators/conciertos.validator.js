const { body, param } = require('express-validator');

const crearConciertoValidator = [
  body('titulo').trim().notEmpty().withMessage('El título es obligatorio')
    .isLength({ min: 2, max: 150 }).withMessage('El título debe tener entre 2 y 150 caracteres'),
  body('descripcion').optional().isString().withMessage('La descripción debe ser texto'),
  body('fecha').notEmpty().withMessage('La fecha es obligatoria')
    .isISO8601().withMessage('La fecha debe tener formato YYYY-MM-DD'),
  body('hora').notEmpty().withMessage('La hora es obligatoria')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/).withMessage('La hora debe tener formato HH:MM o HH:MM:SS'),
  body('generos').optional().isString().withMessage('Los géneros deben ser texto (ej. "Rock, Indie")'),
  body('precio').notEmpty().withMessage('El precio es obligatorio')
    .isFloat({ min: 0 }).withMessage('El precio debe ser un número mayor o igual a 0').toFloat(),
  body('destacado').optional().isBoolean({ strict: false }).withMessage('destacado debe ser true o false').toBoolean()
];

const actualizarConciertoValidator = [
  param('id').isInt({ min: 1 }).withMessage('El id debe ser un número entero válido'),
  ...crearConciertoValidator
];

const idConciertoValidator = [
  param('id').isInt({ min: 1 }).withMessage('El id debe ser un número entero válido')
];

module.exports = { crearConciertoValidator, actualizarConciertoValidator, idConciertoValidator };
