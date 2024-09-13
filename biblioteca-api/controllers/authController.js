const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

exports.loginUsuario = async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Verifique os dados recebidos para login
        console.log('Tentativa de login com:', { email, senha });

        // Verifica se o usuário existe
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            console.log('Usuário não encontrado:', email);
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        // Verifica a senha usando o método compararSenha
        const senhaValida = await usuario.compararSenha(senha);
        if (!senhaValida) {
            console.log('Senha inválida para o usuário:', email);
            return res.status(401).json({ error: 'Senha incorreta.' });
        }

        // Gera o token JWT
        const token = jwt.sign(
            { usuario: { id: usuario._id, nome: usuario.nome, email: usuario.email } },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Envia o token como resposta
        res.json({ token });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro ao fazer login.' });
    }
};


exports.registrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        // Verifique os dados recebidos
        console.log('Dados recebidos para registro:', { nome, email, senha });

        // Verifica se o usuário já existe
        let usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            console.log('Usuário já existente:', email);
            return res.status(400).json({ error: 'O e-mail já está em uso.' });
        }

        // Cria o novo usuário
        const novoUsuario = new Usuario({ nome, email, senha });

        // Salva no banco de dados (a senha será criptografada pelo middleware pre 'save')
        const usuarioSalvo = await novoUsuario.save();

        // Gera um token JWT
        const token = jwt.sign(
            { usuario: { id: usuarioSalvo._id, nome: usuarioSalvo.nome, email: usuarioSalvo.email } },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Envia o token e os dados do usuário registrado
        res.status(201).json({ token, usuario: { id: usuarioSalvo._id, nome: usuarioSalvo.nome, email: usuarioSalvo.email } });
    } catch (error) {
        console.error('Erro ao registrar o usuário:', error);
        res.status(500).json({ error: 'Erro ao registrar o usuário.' });
    }
};
