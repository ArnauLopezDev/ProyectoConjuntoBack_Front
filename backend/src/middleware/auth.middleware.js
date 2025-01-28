const redisClient = require('../services/redis.service.js');
const auth = require('../services/auth.service.js');

const authenticate = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access denied. Invalid or missing token.' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access denied. Invalid token format.' });
    }

    auth.verifyToken(token)
        .then((decoded) => {
            redisClient.get(`session:${decoded.id}`, (err, sessionToken) => {
                if (err) {
                    console.error('Error with Redis:', err.message);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                if (sessionToken !== token) {
                    return res.status(403).json({ error: 'Access denied. Invalid session.' });
                }

                req.user = decoded; // Adjuntar usuario al objeto de la petición
                next();
            });
        })
        .catch(() => res.status(401).json({ error: 'Invalid token' }));
};

// Cerrar sesión
const logout = (req, res) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(400).json({ error: 'Invalid request. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    auth.verifyToken(token)
        .then((decoded) => {
            redisClient.del(`session:${decoded.id}`, (err) => {
                if (err) {
                    console.error('Error deleting session from Redis:', err.message);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                res.status(200).json({ message: 'Logout successful' });
            });
        })
        .catch(() => res.status(400).json({ error: 'Invalid token' }));
};

module.exports = {
    authenticate,
    logout,
};
