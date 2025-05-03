// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors()); // Habilita CORS para permitir peticiones desde React

app.get('/api/hola', (req, res) => {
  res.json({ mensaje: 'Hola mundo' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
