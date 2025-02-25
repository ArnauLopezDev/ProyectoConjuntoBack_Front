// index.js

const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const redisClient = require('./services/redis.service.js');
const config = require('./config/config.js');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
// const ffmpeg = require('fluent-ffmpeg');


// Asegurarse de que la carpeta de uploads exista
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}
// Configuración de Multer para almacenar archivos en disco
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `audio_${Date.now()}_${file.originalname}`;
        cb(null, uniqueName);
    }
});
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
        files: 1
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('audio/')) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten archivos de audio'), false);
        }
    }
});

// Rutas
const animalsRoutes = require('./routes/animals.Routes.js');
const eventosRoutes = require('./routes/eventos.Routes.js');
const ticketsRoutes = require('./routes/tickets.Routes.js');
const zoologicosRoutes = require('./routes/zoologicos.Routes.js');
const comentariosRoutes = require('./routes/comentarios.Routes.js');
const authRoutes = require('./routes/auth.Routes.js');
const adminRoutes = require('./routes/admin.routes.js');
const app = express();
const port = config.port || 3000;
app.use(cors({
    origin: 'http://localhost:5173', // Asegúrate de permitir tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
    credentials: true // Permitir credenciales si es necesario
}));
app.use(express.json());

// Ruta para subir audio
app.post('/api/upload-audio', upload.single('audio'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No se proporcionó archivo de audio' });
        }


        // Generar URL accesible
        const fileUrl = `/api/uploads/${req.file.filename}`;

        res.json({ url: fileUrl });


    } catch (error) {
        console.error('Error subiendo audio:', error);
        res.status(500).json({ error: 'Error al procesar el audio' });
    }
});

// Servir archivos estáticos
app.use('/api/uploads', express.static(uploadsDir));
// Middleware de Express

app.use(express.static('public'));

// Rutas de la API REST
app.use('/api/animals', animalsRoutes);
app.use('/api/eventos', eventosRoutes);
app.use('/api/tickets', ticketsRoutes);
app.use('/api/zoologicos', zoologicosRoutes);
app.use('/api/comentarios', comentariosRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
// Crear el servidor HTTP y WebSocket
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Manejar conexiones WebSocket
const rooms = new Map(); // Mapa para conexiones activas

wss.on('connection', (ws) => {
    let currentRoom = null;
    let currentUser = null;

    ws.on('message', async (message) => {
        try {
            const data = JSON.parse(message);

            // Manejo de unión a sala
            if (data.type === "join") {
                currentRoom = data.room;
                currentUser = data.user;

                // Actualizar conexiones en memoria
                if (!rooms.has(currentRoom)) {
                    rooms.set(currentRoom, new Set());
                }
                rooms.get(currentRoom).add(ws);

                // Actualizar Redis
                await redisClient.sadd(`room:${currentRoom}:users`, currentUser);
                console.log(`Usuario ${currentUser} unido a ${currentRoom}`);
                return;
            }

            // Validar sala y usuario
            if (!currentRoom || !currentUser) {
                console.error('Conexión no inicializada');
                return;
            }

            // Manejar diferentes tipos de mensajes
            switch (data.type) {
                case 'message':
                    await handleMessage(data);
                    break;
                case 'typing':
                case 'stopTyping':
                    broadcastToRoom(data);
                    break;
                case 'audio':
                    await handleAudio(data);
                    break;
                default:
                    console.warn('Tipo de mensaje no reconocido:', data.type);
            }
        } catch (err) {
            console.error('Error procesando mensaje:', err);
        }
    });

    ws.on('close', async () => {
        if (currentRoom && currentUser) {
            // Limpiar de memoria
            rooms.get(currentRoom)?.delete(ws);

            // Limpiar de Redis
            await redisClient.srem(`room:${currentRoom}:users`, currentUser);

            // Notificar que dejó de escribir
            broadcastToRoom({
                type: "stopTyping",
                user: currentUser,
                room: currentRoom
            });
        }
    });

    // Helper: enviar datos a todos los clientes de la sala
    const broadcastToRoom = (data) => {
        rooms.get(currentRoom)?.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    };

    // Función para manejar mensajes (texto y audio)
    const handleMessage = async (data) => {
        // Validar mensaje de texto
        if (!data.text?.trim()) {
            console.error('Mensaje vacío recibido');
            return;
        }

        const messageData = {
            user: currentUser,
            text: data.text,
            timestamp: new Date().toISOString(),
            room: currentRoom,
            type: "message"
        };

        await redisClient.rpush(`chat:${currentRoom}`, JSON.stringify(messageData));
        broadcastToRoom(messageData);
    };
    // Función para enviar mensajes de audio
    const handleAudio = async (data) => {
        if (!data.url) {
            console.error('Mensaje de audio sin URL');
            return;
        }

        const audioMessage = {
            user: currentUser,
            url: data.url,
            timestamp: new Date().toISOString(),
            room: currentRoom,
            type: "audio"
        };

        await redisClient.rpush(`chat:${currentRoom}`, JSON.stringify(audioMessage));
        broadcastToRoom(audioMessage);
    };
});

// Iniciar el servidor HTTP y WebSocket juntos
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
