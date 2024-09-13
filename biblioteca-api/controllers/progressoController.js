const Progresso = require('../models/progresso');
const Usuario = require('../models/usuario');

// Adicionar progresso de leitura
exports.adicionarProgresso = async (req, res) => {
    const { usuarioId, livroId, paginasLidas } = req.body;

    try {
        // Verifica se o usuário existe
        const usuario = await Usuario.findById(usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Verifica se o livro existe
        const livro = await Livro.findById(livroId);
        if (!livro) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }

        // Verifica se as páginas lidas não excedem o total de páginas do livro
        if (paginasLidas > livro.paginas) {
            return res.status(400).json({ message: 'O número de páginas lidas não pode exceder o total de páginas do livro.' });
        }

        // Cria um novo progresso
        const novoProgresso = new Progresso({
            usuarioId,
            livroId,
            paginasLidas,
        });

        // Salva o progresso
        const progressoSalvo = await novoProgresso.save();

        // Adiciona o progresso ao usuário
        usuario.progresso.push(progressoSalvo._id);
        await usuario.save();

        res.status(201).json(progressoSalvo);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar progresso de leitura' });
    }
};

// Atualizar progresso de leitura
exports.atualizarProgresso = async (req, res) => {
    const { progressoId } = req.params;
    const { paginasLidas } = req.body;

    try {
        const progresso = await Progresso.findById(progressoId);
        if (!progresso) {
            return res.status(404).json({ error: 'Progresso não encontrado' });
        }

        // Verifica o livro associado para checar o número de páginas
        const livro = await Livro.findById(progresso.livroId);
        if (paginasLidas > livro.paginas) {
            return res.status(400).json({ message: 'O número de páginas lidas não pode exceder o total de páginas do livro.' });
        }

        progresso.paginasLidas = paginasLidas;
        progresso.dataAtualizacao = Date.now();

        const progressoAtualizado = await progresso.save();
        res.json(progressoAtualizado);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar progresso de leitura' });
    }
};

// Obter progresso de leitura por usuário
exports.obterProgressoPorUsuario = async (req, res) => {
    const { usuarioId } = req.params;

    try {
        const progresso = await Progresso.find({ usuarioId }).populate('livroId');
        res.json(progresso);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter progresso de leitura' });
    }
};