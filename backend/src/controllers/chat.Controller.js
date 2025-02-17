exports.getChatHistory = async (req, res) => {
    const { room } = req.params; // room debería ser algo como "animal-123"

    if (!room) {
        return res.status(400).json({ error: 'Room parameter is required' });
    }

    try {
        const messages = await redisClient.lrangeAsync(`chat:${room}`, 0, -1);
        if (!messages.length) {
            return res.status(200).json([]); // Devuelve un array vacío si no hay mensajes
        }

        const parsedMessages = messages.map((msg) => {
            try {
                return JSON.parse(msg);
            } catch (error) {
                console.error(`Error parseando mensaje en la sala ${room}:`, error);
                return null;
            }
        }).filter(Boolean); // Filtra los mensajes nulos

        res.status(200).json(parsedMessages);
    } catch (err) {
        console.error(`Error obteniendo historial de chat para la sala ${room}:`, err);
        res.status(500).json({ error: 'Internal server error. Could not retrieve chat history.' });
    }
};
