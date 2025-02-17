// index.js

const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const redisClient = require('./services/redis.service.js');
const config = require('./config/config.js');

// Rutas
const animalsRoutes = require('./routes/animals.Routes.js');
const eventosRoutes = require('./routes/eventos.Routes.js');
const ticketsRoutes = require('./routes/tickets.Routes.js');
const zoologicosRoutes = require('./routes/zoologicos.Routes.js');
const comentariosRoutes = require('./routes/comentarios.Routes.js');
const authRoutes = require('./routes/auth.Routes.js');
const app = express();
const port = config.port || 3000;

// Middleware de Express
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Rutas de la API REST
app.use('/api/animals', animalsRoutes);
app.use('/api/eventos', eventosRoutes);
app.use('/api/tickets', ticketsRoutes);
app.use('/api/zoologicos', zoologicosRoutes);
app.use('/api/comentarios', comentariosRoutes);
app.use('/api/auth', authRoutes);
// Crear el servidor HTTP y WebSocket
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Manejar conexiones WebSocket
wss.on('connection', (ws) => {
    console.log('Cliente conectado');

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            const { type, room, user, text } = data;

            if (type === 'join') {
                // Solo se procesa el join una vez
                if (!room || !user) {
                    console.error('Mensaje join inválido');
                    return;
                }
                ws.room = room;
                ws.user = user;
                // Agregar usuario a la sala en Redis
                redisClient.sadd(`room:${room}:users`, user);
                console.log(`Usuario ${user} se ha unido a la sala ${room}`);
                return;
            }

            if (type === 'message') {
                // Si el cliente no se ha unido a una sala, ignorar el mensaje
                if (!ws.room) {
                    console.error('El cliente no se ha unido a ninguna sala');
                    return;
                }
                // Opcional: Verificar que el campo room del mensaje coincida con ws.room
                if (room && room !== ws.room) {
                    console.error('Mensaje con room diferente al asignado al cliente');
                    return;
                }

                if (!text) {
                    console.error('Mensaje sin texto recibido');
                    return;
                }

                const timestamp = new Date();
                // Guardar mensaje en Redis usando la sala asignada a la conexión
                redisClient.rpush(`chat:${ws.room}`, JSON.stringify({ user: ws.user, text, timestamp }));

                // Enviar mensaje a todos los clientes de la misma sala
                wss.clients.forEach((client) => {
                    if (
                        client.readyState === WebSocket.OPEN &&
                        client.room === ws.room
                    ) {
                        client.send(JSON.stringify({ room: ws.room, user: ws.user, text, timestamp }));
                    }
                });
            }
        } catch (err) {
            console.error('Error al procesar el mensaje:', err.message);
        }
    });

    ws.on('close', () => {
        console.log('Cliente desconectado');
        // Eliminar usuario de la sala en Redis
        if (ws.room && ws.user) {
            redisClient.srem(`room:${ws.room}:users`, ws.user);
        }
    });
});


// Iniciar el servidor HTTP y WebSocket juntos
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
