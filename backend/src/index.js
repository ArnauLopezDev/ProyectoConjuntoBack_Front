// index.js

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const WebSocket = require('ws');
const config = require('./config/config.js');

// Controladores y rutas
const animalsRoutes = require('./routes/animalsRoutes.js');

const app = express();
const port = config.port || 3000;

// Crear el servidor HTTP
const server = http.createServer(app);

// Crear el servidor WebSocket
const wss = new WebSocket.Server({ server });

// Middleware y rutas de tu API
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('public'));

// Rutas de la API REST
app.use('/api/animals', animalsRoutes); // Usamos el controlador de animales

// Manejar conexiones WebSocket
wss.on('connection', (ws) => {
    console.log('Cliente conectado');
    ws.on('message', (message) => {
        console.log('Mensaje recibido:', message);
        ws.send(JSON.stringify({ user: 'Server', text: 'Mensaje recibido' }));
    });

    ws.on('close', () => {
        console.log('Cliente desconectado');
    });
});

// Iniciar el servidor HTTP y WebSocket juntos
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



// Asignar cliente a una sala (si el cliente envía su sala al conectarse)
// ws.on('message', (message) => {
//     try {
//         const { room, user, text } = JSON.parse(message);

//         if (room) {
//             ws.room = room; // Asigna la sala al cliente
//             console.log(`Usuario ${user} asignado a la sala ${room}`);
//         }

//         // Enviar mensaje solo a clientes de la misma sala
//         wss.clients.forEach((client) => {
//             if (client.readyState === WebSocket.OPEN && client.room === ws.room) {
//                 client.send(JSON.stringify({ user, text }));
//             }
//         });
//     } catch (err) {
//         console.error('Error al procesar el mensaje:', err.message);
//     }
// });