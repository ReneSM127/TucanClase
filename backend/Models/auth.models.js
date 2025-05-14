const db = require('../Config/db');

const findUserByEmail = async (email) => {
  const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
  return rows[0];
};

module.exports = {
  findUserByEmail,
};