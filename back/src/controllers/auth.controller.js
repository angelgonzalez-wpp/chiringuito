const bcrypt = require('bcryptjs');
const pool = require('../config/db');
const { generarToken } = require('../utils/jwt');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ mensaje: 'Email y password son obligatorios' });
    }

    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const usuario = rows[0];
    const passwordValida = await bcrypt.compare(password, usuario.password);

    if (!passwordValida) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const token = generarToken({
      id: usuario.id,
      email: usuario.email,
      es_admin: !!usuario.es_admin
    });

    res.json({
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        es_admin: !!usuario.es_admin
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
  }
};

const perfil = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, nombre, email, es_admin, creado_en FROM usuarios WHERE id = ?',
      [req.usuario.id]
    );
    if (rows.length === 0) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el perfil', error: error.message });
  }
};

module.exports = { login, perfil };
