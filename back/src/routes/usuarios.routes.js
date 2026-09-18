const express = require('express');
const router = express.Router();
const {
  getUsuarios, getUsuarioPorId, crearUsuario, actualizarUsuario, eliminarUsuario
} = require('../controllers/usuarios.controller');
const {
  crearUsuarioValidator, actualizarUsuarioValidator, idUsuarioValidator
} = require('../validators/usuarios.validator');
const { manejarValidacion } = require('../validators/validate');

router.get('/', getUsuarios);
router.get('/:id', idUsuarioValidator, manejarValidacion, getUsuarioPorId);
router.post('/', crearUsuarioValidator, manejarValidacion, crearUsuario);
router.put('/:id', actualizarUsuarioValidator, manejarValidacion, actualizarUsuario);
router.delete('/:id', idUsuarioValidator, manejarValidacion, eliminarUsuario);

module.exports = router;
