const mongoose = require('mongoose');

const ResenhaSchema = new mongoose.Schema({
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario', // Referência ao modelo de Usuário
        required: true
    },
    livroId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Livro', // Referência ao modelo de Livro
        required: true
    },
    conteudo: {
        type: String,
        required: true
    },
    nota: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    data: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Resenha', ResenhaSchema);
