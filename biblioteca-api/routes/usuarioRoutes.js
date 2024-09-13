const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authController = require('../controllers/authController');

// Rota para registro de novo usuário (substitui criarUsuario se forem idênticos)
router.post('/register', authController.registrarUsuario);
// Rota para login do usuário
router.post('/login', authController.loginUsuario);

// CRUD de usuários (se necessário para administradores)
router.get('/', usuarioController.listarUsuario); // Listar todos os usuários
router.get('/:id', usuarioController.buscarUsuarioPorId); // Buscar um usuário por ID
router.put('/:id', usuarioController.atualizarUsuario); // Atualizar um usuário por ID
router.delete('/:id', usuarioController.deletarUsuario); // Deletar um usuário por ID

// Rotas de livros do usuário
router.post('/:usuarioId/livros', usuarioController.criarLivro);
router.get('/:usuarioId/livros', usuarioController.listarLivros);
router.put('/:usuarioId/livros/:livroId', usuarioController.atualizarLivro);
router.delete('/:usuarioId/livros/:livroId', usuarioController.deletarLivro);

// Rotas de resenhas dos livros
router.post('/:usuarioId/livros/:livroId/resenhas', usuarioController.criarResenha);

// Rotas de progresso de leitura dos livros
router.post('/:usuarioId/livros/:livroId/progresso', usuarioController.adicionarProgresso);

// Rota para listar livros de um usuário
router.get('/:usuarioId/livros', usuarioController.listarLivros);


module.exports = router;
