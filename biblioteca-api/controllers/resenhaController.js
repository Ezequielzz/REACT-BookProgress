const Livro = require('../models/livro');
const Resenha = require('../models/resenha');

exports.criarResenha = async (req, res) => {
    try {
        const { livroId } = req.params;
        const { conteudo, usuarioId, nota } = req.body; // Adicione a nota se necessário

        // Verifica se o livro existe
        const livro = await Livro.findById(livroId);
        if (!livro) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }

        // Verifica se o usuário existe (pode adicionar uma validação aqui se necessário)
        // Exemplo: const usuario = await Usuario.findById(usuarioId);
        // if (!usuario) { return res.status(404).json({ message: 'Usuário não encontrado' }); }

        // Cria a resenha
        const resenha = new Resenha({
            conteudo,
            usuarioId,
            livroId,
            nota, // se aplicável
        });

        const novaResenha = await resenha.save();

        // Adiciona a resenha ao livro
        livro.resenhas.push(novaResenha._id);
        await livro.save();

        res.json({ message: 'Resenha criada com sucesso', resenha: novaResenha });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Atualizar uma resenha
exports.atualizarResenha = async (req, res) => {
    const { resenhaId } = req.params;
    const { conteudo, nota } = req.body;

    try {
        const resenha = await Resenha.findById(resenhaId);
        if (!resenha) {
            return res.status(404).json({ error: 'Resenha não encontrada' });
        }

        resenha.conteudo = conteudo;
        resenha.nota = nota;
        resenha.data = Date.now();

        const resenhaAtualizada = await resenha.save();
        res.json(resenhaAtualizada);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar resenha' });
    }
};

// Obter resenhas por livro
exports.obterResenhasPorLivro = async (req, res) => {
    const { livroId } = req.params;

    try {
        const resenhas = await Resenha.find({ livroId })
            .populate('usuarioId', 'nome')
            .populate('livroId', 'titulo'); // Popula detalhes do livro se necessário
        res.json(resenhas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter resenhas' });
    }
};


// Obter resenhas por usuário
exports.obterResenhasPorUsuario = async (req, res) => {
    const { usuarioId } = req.params;

    try {
        const resenhas = await Resenha.find({ usuarioId }).populate('livroId', 'titulo');
        res.json(resenhas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter resenhas' });
    }
};
