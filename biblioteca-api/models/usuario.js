const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    },

    
    livros: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Livro' // Referência ao modelo de Livro
    }],
    resenhas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resenha' // Referência ao modelo de Resenha
    }],
    progresso: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Progresso' // Referência ao modelo de Progresso
    }]
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
