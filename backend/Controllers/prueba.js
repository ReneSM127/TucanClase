const pruebaGET = async (req, res) => {
    res.json({ mensaje: 'Hola mundo' });
};
module.exports = {
    pruebaGET,
  };

/*const User = require('../models/user.model');

const getUser = async (req, res) => {
  const user = await User.getUserById(req.params.id);
  if (!user) return res.status(404).send({ message: 'User not found' });
  res.json(user);
};

module.exports = {
  getUser,
}; */
