const express = require('express');
const router = express.Router();
const resenhaController = require('../controllers/resenhaController');
const autenticarUsuario = require('../middlewares/authMiddleware'); // Middleware para proteger as rotas

// Adicionar uma resenha
router.post('/', autenticarUsuario, resenhaController.criarResenha);

// Atualizar uma resenha
router.put('/:resenhaId', autenticarUsuario, resenhaController.atualizarResenha);

// Obter resenhas por livro
router.get('/livro/:livroId', resenhaController.obterResenhasPorLivro);

// Obter resenhas por usuário
router.get('/usuario/:usuarioId', autenticarUsuario, resenhaController.obterResenhasPorUsuario);

module.exports = router;
