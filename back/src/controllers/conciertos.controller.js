const pool = require('../config/db');
const cloudinary = require('../config/cloudinary');

const subirImagenACloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'chiringuito/conciertos' },
      (error, resultado) => {
        if (error) return reject(error);
        resolve(
          cloudinary.url(resultado.public_id, {
            secure: true,
            transformation: [
              { width: 1600, height: 1200, crop: 'limit' },
              { quality: 'auto', fetch_format: 'auto' }
            ]
          })
        );
      }
    );
    stream.end(buffer);
  });
};

// Un concierto sigue vigente hasta que pasa su fecha y hora (hora de Madrid)
const FILTRO_PROXIMOS = "(fecha + hora) >= (NOW() AT TIME ZONE 'Europe/Madrid')";

const getConciertos = async (req, res) => {
  try {
    const soloProximos = req.query.proximos === 'true';
    const { rows } = await pool.query(
      `SELECT * FROM conciertos ${soloProximos ? `WHERE ${FILTRO_PROXIMOS}` : ''} ORDER BY fecha, hora`
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener conciertos', error: error.message });
  }
};

const getConciertoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM conciertos WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ mensaje: 'Concierto no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el concierto', error: error.message });
  }
};

const crearConcierto = async (req, res) => {
  try {

    console.log('req.body:', req.body);
    const {
      titulo, descripcion, fecha, hora, generos, precio,
      instagram, facebook, youtube, destacado
    } = req.body;
     

    if (!titulo || !fecha || !hora) {
      return res.status(400).json({ mensaje: 'Titulo, fecha y hora son obligatorios' });
    }

    let imagenUrl = null;
    if (req.file) {
      imagenUrl = await subirImagenACloudinary(req.file.buffer);
    }

    const { rows } = await pool.query(
      `INSERT INTO conciertos
       (titulo, descripcion, fecha, hora, generos, precio, imagen, instagram, facebook, youtube, destacado)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING id`,
      [
        titulo, descripcion || null, fecha, hora, generos || null, precio || 0,
        imagenUrl, instagram || null, facebook || null, youtube || null,
        destacado === 'true' || destacado === true
      ]
    );

    res.status(201).json({
      id: rows[0].id, titulo, descripcion, fecha, hora, generos, precio,
      imagen: imagenUrl, instagram, facebook, youtube,
      destacado: destacado === 'true' || destacado === true
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el concierto', error: error.message });
  }
};

const actualizarConcierto = async (req, res) => {
  try {
    console.log('req.body:', req.body);
    const { id } = req.params;
    const {
      titulo, descripcion, fecha, hora, generos, precio,
      instagram, facebook, youtube, destacado
    } = req.body;

    const { rows: actual } = await pool.query('SELECT imagen FROM conciertos WHERE id = $1', [id]);
    if (actual.length === 0) return res.status(404).json({ mensaje: 'Concierto no encontrado' });

    let imagenUrl = actual[0].imagen;
    if (req.file) {
      imagenUrl = await subirImagenACloudinary(req.file.buffer);
    }

    const resultado = await pool.query(
      `UPDATE conciertos
       SET titulo = $1, descripcion = $2, fecha = $3, hora = $4, generos = $5,
           precio = $6, imagen = $7, instagram = $8, facebook = $9, youtube = $10, destacado = $11
       WHERE id = $12`,
      [
        titulo, descripcion, fecha, hora, generos, precio, imagenUrl,
        instagram || null, facebook || null, youtube || null,
        destacado === 'true' || destacado === true, id
      ]
    );

    if (resultado.rowCount === 0) return res.status(404).json({ mensaje: 'Concierto no encontrado' });

    res.json({
      id, titulo, descripcion, fecha, hora, generos, precio,
      imagen: imagenUrl, instagram, facebook, youtube,
      destacado: destacado === 'true' || destacado === true
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el concierto', error: error.message });
  }
};

const eliminarConcierto = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await pool.query('DELETE FROM conciertos WHERE id = $1', [id]);
    if (resultado.rowCount === 0) return res.status(404).json({ mensaje: 'Concierto no encontrado' });
    res.json({ mensaje: 'Concierto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el concierto', error: error.message });
  }
};

const getConciertosDestacados = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM conciertos WHERE destacado = TRUE AND ${FILTRO_PROXIMOS} ORDER BY fecha, hora`
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener conciertos destacados', error: error.message });
  }
};

module.exports = { getConciertos, getConciertoPorId, crearConcierto, actualizarConcierto, eliminarConcierto, getConciertosDestacados };
