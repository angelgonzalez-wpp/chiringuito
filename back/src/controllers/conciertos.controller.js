const pool = require('../config/db');
const cloudinary = require('../config/cloudinary');

const subirImagenACloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'chiringuito/conciertos' },
      (error, resultado) => {
        if (error) return reject(error);
        resolve(resultado.secure_url);
      }
    );
    stream.end(buffer);
  });
};

const getConciertos = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM conciertos ORDER BY fecha, hora');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener conciertos', error: error.message });
  }
};

const getConciertoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM conciertos WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ mensaje: 'Concierto no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el concierto', error: error.message });
  }
};

const crearConcierto = async (req, res) => {
  try {
    const { titulo, descripcion, fecha, hora, generos, precio, destacado } = req.body;

    if (!titulo || !fecha || !hora) {
      return res.status(400).json({ mensaje: 'Titulo, fecha y hora son obligatorios' });
    }

    let imagenUrl = null;
    if (req.file) {
      imagenUrl = await subirImagenACloudinary(req.file.buffer);
    }

    const [resultado] = await pool.query(
      `INSERT INTO conciertos (titulo, descripcion, fecha, hora, generos, precio, imagen, destacado)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [titulo, descripcion || null, fecha, hora, generos || null, precio || 0, imagenUrl, destacado === 'true' || destacado === true]
    );

    res.status(201).json({
      id: resultado.insertId, titulo, descripcion, fecha, hora, generos, precio,
      imagen: imagenUrl, destacado: destacado === 'true' || destacado === true
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el concierto', error: error.message });
  }
};

const actualizarConcierto = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, fecha, hora, generos, precio, destacado } = req.body;

    const [actual] = await pool.query('SELECT imagen FROM conciertos WHERE id = ?', [id]);
    if (actual.length === 0) return res.status(404).json({ mensaje: 'Concierto no encontrado' });

    let imagenUrl = actual[0].imagen;
    if (req.file) {
      imagenUrl = await subirImagenACloudinary(req.file.buffer);
    }

    const [resultado] = await pool.query(
      `UPDATE conciertos SET titulo = ?, descripcion = ?, fecha = ?, hora = ?, generos = ?, precio = ?, imagen = ?, destacado = ? WHERE id = ?`,
      [titulo, descripcion, fecha, hora, generos, precio, imagenUrl, destacado === 'true' || destacado === true, id]
    );

    if (resultado.affectedRows === 0) return res.status(404).json({ mensaje: 'Concierto no encontrado' });

    res.json({
      id, titulo, descripcion, fecha, hora, generos, precio,
      imagen: imagenUrl, destacado: destacado === 'true' || destacado === true
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el concierto', error: error.message });
  }
};

const eliminarConcierto = async (req, res) => {
  try {
    const { id } = req.params;
    const [resultado] = await pool.query('DELETE FROM conciertos WHERE id = ?', [id]);
    if (resultado.affectedRows === 0) return res.status(404).json({ mensaje: 'Concierto no encontrado' });
    res.json({ mensaje: 'Concierto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el concierto', error: error.message });
  }
};

const getConciertosDestacados = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM conciertos WHERE destacado = TRUE ORDER BY fecha');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener conciertos destacados', error: error.message });
  }
};

module.exports = { getConciertos, getConciertoPorId, crearConcierto, actualizarConcierto, eliminarConcierto, getConciertosDestacados };
