const express = require('express');
const router = express.Router();
const {
  getConciertos,
  getConciertoPorId,
  crearConcierto,
  actualizarConcierto,
  eliminarConcierto,
  getConciertosDestacados
} = require('../controllers/conciertos.controller');
const {
  crearConciertoValidator,
  actualizarConciertoValidator,
  idConciertoValidator
} = require('../validators/conciertos.validator');
const { manejarValidacion } = require('../validators/validate');
const upload = require('../middleware/upload.middleware');
const { verificarAutenticacion, verificarAdmin } = require('../middleware/auth.middleware');

// Lectura: pública (la usa también la web pública de conciertos)
router.get('/destacados', getConciertosDestacados);
router.get('/', getConciertos);
router.get('/:id', idConciertoValidator, manejarValidacion, getConciertoPorId);

// Escritura: solo un usuario autenticado Y admin puede crear/editar/borrar
router.post(
  '/',
  verificarAutenticacion,
  verificarAdmin,
  upload.single('imagen'),
  crearConciertoValidator,
  manejarValidacion,
  crearConcierto
);

router.put(
  '/:id',
  verificarAutenticacion,
  verificarAdmin,
  upload.single('imagen'),
  actualizarConciertoValidator,
  manejarValidacion,
  actualizarConcierto
);

router.delete(
  '/:id',
  verificarAutenticacion,
  verificarAdmin,
  idConciertoValidator,
  manejarValidacion,
  eliminarConcierto
);

module.exports = router;
