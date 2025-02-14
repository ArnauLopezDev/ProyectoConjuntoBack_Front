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
// Crear el servidor HTTP y WebSocket
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Manejar conexiones WebSocket
wss.on('connection', (ws) => {
    console.log('Cliente conectado');

    ws.on('message', (message) => {
        try {
            const { room, user, text } = JSON.parse(message);

            if (!room || !user || !text) {
                console.error('Mensaje inválido recibido');
                return;
            }

            // Asignar sala y usuario al WebSocket
            ws.room = room;
            ws.user = user;

            // Agregar usuario a la sala en Redis
            redisClient.sadd(`room:${room}:users`, user);

            // Guardar mensaje en Redis
            const timestamp = new Date();
            redisClient.rpush(`chat:${room}`, JSON.stringify({ user, text, timestamp }));

            // Enviar mensaje a todos los clientes de la misma sala
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN && client.room === room) {
                    client.send(JSON.stringify({ user, text, timestamp }));
                }
            });
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
