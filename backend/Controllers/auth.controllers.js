const bcrypt = require("bcryptjs");
const auth = require('../Models/auth.models');

const login = async (req, res) => {
    const { email, password } = req.body;
    try {

        const user = await auth.findUserByEmail(email);
        if (!user) return res.status(401).json({ message: 'no existe' });

        const isMatch = bcrypt.compareSync(password, user.password);
                
        if (!isMatch) return res.status(401).json({ message: 'Credenciales inválidas' });
        
        res.json({user: { id: user.id, name: user.nombre, email: user.email } });

    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
}

module.exports = { login };
