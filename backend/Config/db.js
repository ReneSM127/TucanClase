const mysql = require('mysql2/promise');

//La base de datos está en la raíz para que la importen, aunque no tiene registros

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tucanclase',
});
module.exports = pool;
