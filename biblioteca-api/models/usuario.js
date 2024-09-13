const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Schema para Livro como subdocumento
const LivroSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    autor: { type: String, required: true },
    genero: { type: String, required: true },
    paginas: { type: Number },
    resenhas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resenha' }] // Referência para manter compatibilidade
});

// Schema para Resenha como subdocumento
const ResenhaSchema = new mongoose.Schema({
    conteudo: { type: String, required: true },
    nota: { type: Number, required: true, min: 0, max: 5 },
    data: { type: Date, default: Date.now },
    livroId: { type: mongoose.Schema.Types.ObjectId, ref: 'Livro' } // Referência para compatibilidade com Livro
});

// Schema para Progresso como subdocumento
const ProgressoSchema = new mongoose.Schema({
    livroId: { type: mongoose.Schema.Types.ObjectId, ref: 'Livro' },
    paginasLidas: { type: Number, required: true },
    dataAtualizacao: { type: Date, default: Date.now }
});

// Schema principal de Usuario
const UsuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    livros: [LivroSchema], // Livros como subdocumento
    resenhas: [ResenhaSchema], // Resenhas como subdocumento
    progresso: [ProgressoSchema] // Progresso como subdocumento
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
