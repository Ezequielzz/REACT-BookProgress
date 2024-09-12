const express = require('express');
const bodyParser = require('body-parser');
const livroRoutes = require('./routes/livroRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const progressoRoutes = require('./routes/progressoRoutes');
const resenhaRoutes = require('./routes/resenhaRoutes');
const cors = require('cors');
require('dotenv').config();
require('./config/database'); // Conectando ao banco de dados

const corsOptions = { origin: "http://localhost:3000" };

const app = express();


// Middlewares
app.use(cors(corsOptions), bodyParser.json());


// Rotas
app.use('/usuarios', usuarioRoutes);
app.use('/livros', livroRoutes);
app.use('/progresso', progressoRoutes);
app.use('/resenhas', resenhaRoutes);


// Exportando a aplicação configurada
module.exports = app;
