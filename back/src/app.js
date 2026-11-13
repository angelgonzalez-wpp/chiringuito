const express = require('express');
const cors = require('cors');
require('dotenv').config();

const usuariosRoutes = require('./routes/usuarios.routes');
const conciertosRoutes = require('./routes/conciertos.routes');
const authRoutes = require('./routes/auth.routes');
const pool = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensaje: 'API funcionando correctamente' });
});

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ mensaje: 'API y base de datos funcionando correctamente' });
  } catch (error) {
    console.error('Health check de base de datos fallido:', error);
    res.status(503).json({ mensaje: 'Base de datos no disponible' });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/conciertos', conciertosRoutes);

app.use((req, res) => {
  res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
