const mongoose = require('mongoose');


const LivroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    genero: {
        type: String,
        required: true
    },
    paginas: {
        type: Number,
        required: false
    },
    resenhas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resenha' // Referência ao modelo de Resenha
    }]
});


module.exports = mongoose.model('Livro', LivroSchema);