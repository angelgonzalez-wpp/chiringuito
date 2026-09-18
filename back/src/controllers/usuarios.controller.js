const bcrypt = require('bcryptjs');
const pool = require('../config/db');

const getUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, nombre, email, es_admin, creado_en FROM usuarios');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error: error.message });
  }
};

const getUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      'SELECT id, nombre, email, es_admin, creado_en FROM usuarios WHERE id = ?',
      [id]
    );
    if (rows.length === 0) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el usuario', error: error.message });
  }
};

const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, password, es_admin } = req.body;
    if (!nombre || !email || !password) {
      return res.status(400).json({ mensaje: 'Nombre, email y password son obligatorios' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const [resultado] = await pool.query(
      'INSERT INTO usuarios (nombre, email, password, es_admin) VALUES (?, ?, ?, ?)',
      [nombre, email, passwordHash, !!es_admin]
    );
    res.status(201).json({ id: resultado.insertId, nombre, email, es_admin: !!es_admin });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el usuario', error: error.message });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, password, es_admin } = req.body;
    let query = 'UPDATE usuarios SET nombre = ?, email = ?, es_admin = ?';
    const params = [nombre, email, !!es_admin];
    if (password) {
      const passwordHash = await bcrypt.hash(password, 10);
      query += ', password = ?';
      params.push(passwordHash);
    }
    query += ' WHERE id = ?';
    params.push(id);
    const [resultado] = await pool.query(query, params);
    if (resultado.affectedRows === 0) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json({ id, nombre, email, es_admin: !!es_admin });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el usuario', error: error.message });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const [resultado] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
    if (resultado.affectedRows === 0) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el usuario', error: error.message });
  }
};

module.exports = { getUsuarios, getUsuarioPorId, crearUsuario, actualizarUsuario, eliminarUsuario };
