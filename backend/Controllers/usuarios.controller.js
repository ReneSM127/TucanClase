const User = require('../Models/usuarios');

const getUser = async (req, res) => {
  const user = await User.getUserById(req.params.id);
  if (!user) return res.status(404).send({ message: 'no existe' });
  res.json(user);
};

module.exports = {
  getUser,
};