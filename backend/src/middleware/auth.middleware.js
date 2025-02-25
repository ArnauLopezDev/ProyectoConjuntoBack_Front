// middlewares/auth.middleware.js
const auth = require('../services/auth.service.js');

exports.requireAdmin = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'No se proporcionó token de autenticación' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = await auth.verifyToken(token);
        if (decoded.rol !== 'admin') {
            return res.status(403).json({ error: 'Acceso prohibido: solo administradores' });
        }
        req.user = decoded; // Opcional: puedes usar la info del usuario en el req
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido' });
    }
};
