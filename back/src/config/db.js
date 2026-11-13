const { Pool, types } = require('pg');
const { parse } = require('pg-connection-string');
require('dotenv').config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL no está definida.');
}

if (!process.env.DB_SSL_CA) {
  throw new Error('DB_SSL_CA no está definida; configura el certificado raíz de Supabase.');
}

types.setTypeParser(types.builtins.DATE, (value) => value);

const connectionConfig = parse(process.env.DATABASE_URL);
const pool = new Pool({
  ...connectionConfig,
  ssl: {
    ca: process.env.DB_SSL_CA.replace(/\\n/g, '\n'),
    rejectUnauthorized: true
  }
});

pool.on('error', (error) => {
  console.error('Error inesperado en el pool de PostgreSQL:', error);
});

module.exports = pool;
