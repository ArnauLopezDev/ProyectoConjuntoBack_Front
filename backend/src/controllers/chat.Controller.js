const redisClient = require('../services/redis.service.js');

// Using a Promise-based approach (if supported)
exports.getChatHistory = async (req, res) => {
    const { room } = req.params;

    if (!room) {
        return res.status(400).json({ error: 'Room parameter is required' });
    }

    try {
        const messages = await redisClient.lrangeAsync(`chat:${room}`, 0, -1);
        const parsedMessages = messages.map((msg) => {
            try {
                return JSON.parse(msg);
            } catch {
                return null;
            }
        }).filter(Boolean);

        res.status(200).json(parsedMessages);
    } catch (err) {
        console.error('Error retrieving chat history from Redis:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
