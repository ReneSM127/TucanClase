const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const pruebaruta = require('./Routes/prueba');
const rutaUsuarios = require('./Routes/usuarios.routes');

app.use(cors()); // Habilita CORS 

//middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan("dev"));

app.use('/api/', pruebaruta);
app.use('/api/usuario', rutaUsuarios);


module.exports = app;
