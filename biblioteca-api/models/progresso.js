const mongoose = require('mongoose');

const ProgressoSchema = new mongoose.Schema({
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
    paginasLidas: {
        type: Number,
        required: true
    },
    dataAtualizacao: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Progresso', ProgressoSchema);
