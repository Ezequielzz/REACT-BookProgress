const express = require('express');
const bodyParser = require('body-parser');
const usuarioRoutes = require('./routes/usuarioRoutes');
const cors = require('cors');
require('dotenv').config();
require('./config/database'); // Conectando ao banco de dados

const corsOptions = { origin: "http://localhost:3000" };

const app = express();


// Middlewares
app.use(cors(corsOptions), bodyParser.json());

// Rotas
app.use('/usuarios', usuarioRoutes);


// Exportando a aplicação configurada
module.exports = app;
