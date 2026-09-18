const express = require('express');
const router = express.Router();
const { login, perfil } = require('../controllers/auth.controller');
const { verificarAutenticacion } = require('../middleware/auth.middleware');
const { loginValidator } = require('../validators/auth.validator');
const { manejarValidacion } = require('../validators/validate');

router.post('/login', loginValidator, manejarValidacion, login);
router.get('/me', verificarAutenticacion, perfil);

module.exports = router;
