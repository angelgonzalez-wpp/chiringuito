const mysql = require('mysql2/promise');
require('dotenv').config();

const DB_SSL_CA = process.env.DB_SSL_CA;

if (process.env.NODE_ENV === 'production' && !DB_SSL_CA) {
  throw new Error('DB_SSL_CA es obligatorio en producción para conectar con TLS.');
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: DB_SSL_CA
    ? {
        ca: DB_SSL_CA.replace(/\\n/g, '\n'),
        rejectUnauthorized: true
      }
    : undefined,
  // Las columnas DATE se devuelven como texto "YYYY-MM-DD" en lugar de objeto Date.
  // Si se devolviera un Date, al pasar por JSON se convertiría en ISO con hora y
  // zona ("2026-12-30T23:00:00.000Z"), lo que rompía el formateo en el front
  // (new Date(fecha + 'T00:00:00') -> Invalid Date) y desplazaba un día la fecha.
  dateStrings: ['DATE'],
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
