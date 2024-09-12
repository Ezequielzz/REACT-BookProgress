const express = require('express');
const router = express.Router();
const progressoController = require('../controllers/progressoController');

// Adicionar progresso de leitura
router.post('/', progressoController.adicionarProgresso);

// Atualizar progresso de leitura
router.put('/:progressoId', progressoController.atualizarProgresso);

// Obter progresso de leitura por usuário
router.get('/usuario/:usuarioId', progressoController.obterProgressoPorUsuario);

module.exports = router;
