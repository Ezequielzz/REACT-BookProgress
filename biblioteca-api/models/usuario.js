const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

// Middleware para criptografar a senha antes de salvar
UsuarioSchema.pre('save', async function (next) {
    // Verifica se a senha foi modificada
    if (!this.isModified('senha')) {
        return next();
    }

    try {
        // Gera o salt e faz o hash da senha
        const salt = await bcrypt.genSalt(10);
        this.senha = await bcrypt.hash(this.senha, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Método para comparar senhas
UsuarioSchema.methods.compararSenha = async function (senhaInserida) {
    return await bcrypt.compare(senhaInserida, this.senha);
};


module.exports = mongoose.model('Usuario', UsuarioSchema);
