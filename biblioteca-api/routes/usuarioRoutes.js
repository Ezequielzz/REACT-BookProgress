const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rota para criar um novo usuário
router.post('/', usuarioController.criarUsuario);

// Rota para listar todos os usuários
router.get('/', usuarioController.listarUsuario);

// Rota para buscar um usuário por ID
router.get('/:id', usuarioController.buscarUsuarioPorId);

// Rota para atualizar um usuário por ID
router.put('/:id', usuarioController.atualizarUsuario);

// Rota para deletar um usuário por ID
router.delete('/:id', usuarioController.deletarUsuario);

// Rota para adicionar um livro a um usuário
router.post('/:usuarioId/livros', usuarioController.adicionarLivroAoUsuario);

// Rota para remover um livro de um usuário
router.delete('/:usuarioId/livros', usuarioController.removerLivroDoUsuario);

module.exports = router;
