const express = require('express');
const app = express();
const cors = require('cors');
const pruebaruta = require('./Routes/prueba');
const rutaUsuarios = require('./Routes/usuarios.routes');

app.use(cors()); // Habilita CORS 

app.use(express.json());
app.use('/api/', pruebaruta);
app.use('/api/usuario', rutaUsuarios);


module.exports = app;
