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



// Criar um novo livro dentro de um usuário
exports.criarLivro = async (req, res) => {
    const { usuarioId } = req.params;
    const { titulo, autor, genero, paginas } = req.body;

    try {
        // Busca o usuário
        const usuario = await Usuario.findById(usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Adiciona o novo livro ao array de livros do usuário
        const novoLivro = { titulo, autor, genero, paginas };
        usuario.livros.push(novoLivro);
        await usuario.save();

        res.status(201).json({ message: 'Livro criado com sucesso', livro: novoLivro });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Criar resenha dentro de um usuário
exports.criarResenha = async (req, res) => {
    const { usuarioId, livroId } = req.params;
    const { conteudo, nota } = req.body;

    try {
        const usuario = await Usuario.findById(usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Procura o livro específico no array de livros do usuário
        const livro = usuario.livros.id(livroId);
        if (!livro) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }

        // Adiciona uma nova resenha ao livro
        const novaResenha = { conteudo, nota, data: new Date() };
        usuario.resenhas.push(novaResenha);
        await usuario.save();

        res.status(201).json({ message: 'Resenha criada com sucesso', resenha: novaResenha });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Adicionar progresso de leitura dentro de um usuário
exports.adicionarProgresso = async (req, res) => {
    const { usuarioId, livroId } = req.params;
    const { paginasLidas } = req.body;

    try {
        const usuario = await Usuario.findById(usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Procura o livro no array de livros do usuário
        const livro = usuario.livros.id(livroId);
        if (!livro) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }

        // Adiciona ou atualiza o progresso de leitura
        const progressoExistente = usuario.progresso.find(p => p.livroId.toString() === livroId);
        if (progressoExistente) {
            progressoExistente.paginasLidas = paginasLidas;
            progressoExistente.dataAtualizacao = new Date();
        } else {
            usuario.progresso.push({ livroId, paginasLidas, dataAtualizacao: new Date() });
        }

        await usuario.save();
        res.status(201).json({ message: 'Progresso de leitura atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Listar livros de um usuário
exports.listarLivros = async (req, res) => {
    const { usuarioId } = req.params;

    try {
        const usuario = await Usuario.findById(usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.json(usuario.livros);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Atualizar um livro de um usuário
exports.atualizarLivro = async (req, res) => {
    try {
        // Busca o usuário pelo ID
        const usuario = await Usuario.findById(req.params.usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Verifica se o livro pertence ao usuário
        const livro = usuario.livros.id(req.params.livroId);
        if (!livro) {
            return res.status(404).json({ message: 'Livro não encontrado' });
        }

        // Atualiza os campos do livro
        if (req.body.titulo != null) {
            livro.titulo = req.body.titulo;
        }
        if (req.body.autor != null) {
            livro.autor = req.body.autor;
        }
        if (req.body.paginas != null) {
            livro.paginas = req.body.paginas;
        }
        if (req.body.genero != null) {
            livro.genero = req.body.genero;
        }

        console.log(req.params.usuarioId, req.params.livroId); // Verificar IDs recebidos

        // Salva o usuário atualizado
        await usuario.save();
        res.json({ message: 'Livro atualizado com sucesso', livro });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Deletar um livro de um usuário
exports.deletarLivro = async (req, res) => {
    const { usuarioId, livroId } = req.params;

    try {
        const usuario = await Usuario.findById(usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        usuario.livros.id(livroId).deleteOne();
        await usuario.save();
        res.json({ message: 'Livro deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};