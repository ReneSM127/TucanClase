const db = require('../Config/db');

const getUserById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM usuarios WHERE id = ?', [id]);
  return rows[0];
};

module.exports = {
  getUserById,
};
