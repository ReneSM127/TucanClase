const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const auth = require('../Models/auth.models');

const login = async (req, res) => {
    const { email, password } = req.body;
    try {

        const user = await auth.findUserByEmail(email);
        if (!user) return res.status(401).json({ message: 'no existe' });

        const isMatch = bcrypt.compareSync(password, user.password);
                
        if (!isMatch) return res.status(401).json({ message: 'Credenciales inválidas' });

        //Se guardan los siguientes datos en el LocalStorage
        const usuario = { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol};
        const token = jwt.sign(usuario, 'mi_clave_secreta', { expiresIn: '1h' }); // usar una clave más segura
        
        //Enviamos al frontend los 2 tokens
        res.json({ usuario, token });

    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
}

module.exports = { login };
