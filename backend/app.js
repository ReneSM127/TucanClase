const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const rutaUsuarios = require('./Routes/usuarios.routes');
const inscripcionesRouter = require('./Routes/inscripciones.routes');
const reviewsRouter = require('./Routes/reviews.routes');
const rutaAuth = require('./Routes/auth.models');


app.use(cors()); // Habilita CORS 

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use('/api/usuario', rutaUsuarios);
app.use('/api/inscripciones', inscripcionesRouter);
app.use('/api/reviews',reviewsRouter);
app.use('/api/auth', rutaAuth);



module.exports = app;
