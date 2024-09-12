const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

// Login de usuário
exports.loginUsuario = async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Verifica se o usuário existe
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        // Verifica a senha
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({ error: 'Senha incorreta.' });
        }

        // Gera o token JWT
        const token = jwt.sign(
            { usuario: { id: usuario._id, nome: usuario.nome, email: usuario.email } },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expira em 1 hora
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao fazer login.' });
    }
};

exports.registrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        // Verifica se o usuário já existe pelo e-mail
        let usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ error: 'O e-mail já está em uso.' });
        }

        // Criptografar a senha
        const salt = await bcrypt.genSalt(10);
        const senhaCriptografada = await bcrypt.hash(senha, salt);

        // Criar o novo usuário
        const novoUsuario = new Usuario({
            nome,
            email,
            senha: senhaCriptografada
        });

        // Salvar no banco de dados
        const usuarioSalvo = await novoUsuario.save();

        // Gerar um token JWT
        const token = jwt.sign(
            { usuario: { id: usuarioSalvo._id, nome: usuarioSalvo.nome, email: usuarioSalvo.email } },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Expira em 1 hora
        );

        // Retornar o token e os dados do usuário
        res.status(201).json({
            token,
            usuario: {
                id: usuarioSalvo._id,
                nome: usuarioSalvo.nome,
                email: usuarioSalvo.email
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar o usuário.' });
    }
};
