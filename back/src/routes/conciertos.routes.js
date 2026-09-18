const express = require('express');
const router = express.Router();
const {
  getConciertos, getConciertoPorId, crearConcierto, actualizarConcierto,
  eliminarConcierto, getConciertosDestacados
} = require('../controllers/conciertos.controller');
const {
  crearConciertoValidator, actualizarConciertoValidator, idConciertoValidator
} = require('../validators/conciertos.validator');
const { manejarValidacion } = require('../validators/validate');
const upload = require('../middleware/upload.middleware');

router.get('/destacados', getConciertosDestacados);
router.get('/', getConciertos);
router.get('/:id', idConciertoValidator, manejarValidacion, getConciertoPorId);
router.post('/', upload.single('imagen'), crearConciertoValidator, manejarValidacion, crearConcierto);
router.put('/:id', upload.single('imagen'), actualizarConciertoValidator, manejarValidacion, actualizarConcierto);
router.delete('/:id', idConciertoValidator, manejarValidacion, eliminarConcierto);

module.exports = router;
