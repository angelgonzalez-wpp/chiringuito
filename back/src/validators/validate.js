const { validationResult } = require('express-validator');

const manejarValidacion = (req, res, next) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json({
      mensaje: 'Datos inválidos',
      errores: errores.array().map((e) => ({ campo: e.path, mensaje: e.msg }))
    });
  }

  next();
};

module.exports = { manejarValidacion };
