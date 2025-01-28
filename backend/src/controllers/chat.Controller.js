const redisClient = require('../services/redis.service.js');

exports.getChatHistory = (req, res) => {
    const { room } = req.params;

    if (!room) {
        return res.status(400).json({ error: 'Room parameter is required' });
    }

    redisClient.lrange(`chat:${room}`, 0, -1, (err, messages) => {
        if (err) {
            console.error('Error retrieving chat history from Redis:', err.message);
            return res.status(500).json({ error: 'Internal server error' });
        }

        const parsedMessages = messages.map((msg) => {
            try {
                return JSON.parse(msg);
            } catch {
                return null; // Manejar mensajes corruptos
            }
        }).filter(Boolean); // Eliminar mensajes corruptos

        res.status(200).json(parsedMessages);
    });
};
