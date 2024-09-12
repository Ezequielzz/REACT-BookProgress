const Usuario = require('../models/usuario'); // Importa o modelo 'Usuario' do arquivo de modelos


// Criar um novo usuario
exports.criarUsuario = async (req, res) => {
    // Cria uma nova instância do modelo 'Usuario' com os dados recebidos na requisição
    const usuario = new Usuario({
        nome: req.body.nome,   // Nome do usuario
        email: req.body.email,     // Email do usuario         
        senha: req.body.senha,    // Senha do usuario
    });


    try {
        // Salva o novo usuario no banco de dados
        const novoUsuario = await usuario.save();
        // Retorna o usuario criado com status 201 (Criado)   
        res.status(201).json(novoUsuario);
    } catch (err) {
        // Em caso de erro, retorna uma mensagem de erro com status 400 (Bad Request)
        res.status(400).json({ message: err.message });
    }
};


// Listar todos os usuarios
exports.listarUsuario = async (req, res) => {
    try {
        // Busca todos os usuarios no banco de dados
        const usuario = await Usuario.find();
        // Retorna a lista de usuarios
        res.json(usuario);
    } catch (err) {
        // Em caso de erro, retorna uma mensagem de erro com status 500 (Internal Server Error)
        res.status(500).json({ message: err.message });
    }
};


// Buscar um usuario por ID
exports.buscarUsuarioPorId = async (req, res) => {
    try {
        // Busca um usuario pelo ID recebido nos parâmetros da requisição
        const usuario = await Usuario.findById(req.params.id);
        if (usuario == null) {
            // Se o usuario não for encontrado, retorna status 404 (Não Encontrado)
            return res.status(404).json({ message: 'Usuario não encontrado' });
        }
        // Retorna o usuario encontrado
        res.json(usuario);
    } catch (err) {
        // Em caso de erro, retorna uma mensagem de erro com status 500 (Internal Server Error)
        res.status(500).json({ message: err.message });
    }
};


// Atualizar um usuario por ID
exports.atualizarUsuario = async (req, res) => {
    try {
        // Busca o usuario pelo ID
        const usuario = await Usuario.findById(req.params.id);
        if (usuario == null) {
            // Se o usuario não for encontrado, retorna status 404 (Não Encontrado)
            return res.status(404).json({ message: 'Usuario não encontrado' });
        }


        // Verifica quais campos foram enviados na requisição e os atualiza
        if (req.body.nome != null) {
            usuario.nome = req.body.nome;
        }
        if (req.body.email != null) {
            usuario.email = req.body.email;
        }
        if (req.body.senha != null) {
            usuario.senha = req.body.senha;
        }


        // Salva o usuario atualizado no banco de dados
        const usuarioAtualizado = await usuario.save();
        // Retorna o usuario atualizado
        res.json(usuarioAtualizado);
    } catch (err) {
        // Em caso de erro, retorna uma mensagem de erro com status 400 (Bad Request)
        res.status(400).json({ message: err.message });
    }
};


// Deletar um usuario por ID
exports.deletarUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (usuario == null) {
            return res.status(404).json({ message: 'Usuario não encontrado' });
        }
        await usuario.deleteOne();
        res.json({ message: 'Usuario deletado com sucesso' });
    } catch (err) {
        console.error("Erro ao deletar usuario:", err);
        res.status(500).json({ message: err.message });
    }
};


// Adicionar um livro a um usuário
exports.adicionarLivroAoUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const livro = await Livro.findById(req.body.livroId);
        if (!livro) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }

        // Adiciona o livro ao array de livros do usuário
        usuario.livros.push(livro._id);
        await usuario.save();

        res.json({ message: 'Livro adicionado ao usuário com sucesso', usuario });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Remover um livro de um usuário
exports.removerLivroDoUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Remove o livro do array de livros do usuário
        usuario.livros.pull(req.body.livroId);
        await usuario.save();

        res.json({ message: 'Livro removido do usuário com sucesso', usuario });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};