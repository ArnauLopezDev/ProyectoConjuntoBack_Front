const getAnimalId = () => {
    const pathSegments = window.location.pathname.split('/');
    return pathSegments[pathSegments.length - 1] || 'default';
};

const roomId = `animal-${getAnimalId()}`;
const socketUrl = roomId ? `ws://localhost:3000/${roomId}` : "ws://localhost:3000/chat";
const user = localStorage.getItem("chatUser");

let socket;
let pendingMessages = [];
let reconnectAttempts = 0;

const connectWebSocket = () => {
    socket = new WebSocket(socketUrl);

    socket.onopen = () => {
        console.log("Conectado al servidor WebSocket");
        reconnectAttempts = 0;
        socket.send(JSON.stringify({
            type: "join",
            room: roomId,
            user: user
        }));
        // Enviar mensajes pendientes
        pendingMessages.forEach(msg => socket.send(msg));
        pendingMessages = [];
    };

    socket.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            console.log("Evento recibido:", data);
        } catch (error) {
            console.error("Error procesando mensaje:", error.message);
        }
    };

    socket.onclose = () => {
        console.log("Conexión cerrada. Reconectando...");
        reconnectAttempts++;
        const delay = Math.min(10000, 1000 * Math.pow(2, reconnectAttempts));
        setTimeout(connectWebSocket, delay);
    };

    socket.onerror = (error) => {
        console.error("Error de WebSocket:", error);
    };
};

// Iniciar conexión inicial
connectWebSocket();

// Función para enviar mensajes a través de WebSocket o fetch
const sendMessage = (messageData) => {
    if (messageData.type === 'message') {
        // Enviar mensaje de texto
        send(messageData); // Enviar al WebSocket
        sendToServer(messageData); // Enviar al servidor usando fetch
    } else if (messageData.type === 'audio') {
        // Enviar mensaje de audio
        send(messageData); // Enviar al WebSocket
        sendAudioToServer(messageData); // Enviar el archivo de audio al servidor usando fetch
    }
};

// Enviar mensaje de texto al servidor mediante fetch
const sendToServer = (data) => {
    fetch('http://localhost:3000/api/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => console.log("Mensaje enviado al servidor:", data))
        .catch(error => console.error("Error al enviar el mensaje:", error));
};

// Subir archivo de audio al servidor mediante fetch
const sendAudioToServer = (data) => {
    fetch('http://localhost:3000/api/uploads', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...data,
            url: data.url, // La URL Base64 del archivo de audio
        }),
    })
        .then(response => response.json())
        .then(data => console.log("Archivo de audio enviado al servidor:", data))
        .catch(error => console.error("Error al enviar el audio:", error));
};

// Exportar función para enviar mensajes
export const send = (data) => {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(data));
    } else {
        pendingMessages.push(data);
    }
};

// Exportar instancia para escuchar eventos
export default socket;
