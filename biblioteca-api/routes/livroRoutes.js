const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');

// Criar um novo livro
router.post('/', livroController.criarLivro);

// Listar todos os livros
router.get('/', livroController.listarLivros);

// Buscar um livro por ID
router.get('/:id', livroController.buscarLivroPorId);

// Atualizar um livro por ID
router.put('/:id', livroController.atualizarLivro);

// Deletar um livro por ID
router.delete('/:id', livroController.deletarLivro);

module.exports = router;
