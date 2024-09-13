const jwt = require('jsonwebtoken');

// Middleware de autenticação
const autenticarUsuario = (req, res, next) => {
    // Pega o token do cabeçalho da requisição
    const token = req.header('Authorization');

    // Verifica se o token foi fornecido
    if (!token) {
        return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
    }

    try {
        // Verifica e decodifica o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Busca o usuário associado ao token
        req.usuario = decoded.usuario; // Armazena o ID do usuário no req para acesso nas rotas
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido.' });
    }
};

module.exports = autenticarUsuario;
