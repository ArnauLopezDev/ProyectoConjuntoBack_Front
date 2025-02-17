// Obtén el ID del animal de la URL (por ejemplo, "123")
const getAnimalId = () => {
    const pathSegments = window.location.pathname.split('/');
    return pathSegments[pathSegments.length - 1] || 'default';
};

// Define un roomId único para cada animal, ej. "animal-123"
const roomId = `animal-${getAnimalId()}`;

// Get WebSocket URL dynamically
const socketUrl = roomId ? `ws://localhost:3000/${roomId}` : "ws://localhost:3000/chat";

let pendingMessages = [];
let socket;

// Obtener el usuario (por ejemplo, desde localStorage)
const user = localStorage.getItem("chatUser") || `Usuario_${Math.floor(Math.random() * 1000)}`;

const connectWebSocket = () => {
    socket = new WebSocket(socketUrl);

    socket.onopen = () => {
        console.log("Conectado al servidor WebSocket");
        // Envía mensaje de "join" con el roomId único y el usuario
        socket.send(JSON.stringify({ type: "join", room: roomId, user: user }));
        console.log("Sala de chat:", roomId);
        console.log("WebSocket reconectado. Enviando mensajes pendientes...");
        while (pendingMessages.length > 0) {
            socket.send(JSON.stringify(pendingMessages.shift()));
        }
    };

    socket.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            console.log("Mensaje recibido:", data);
        } catch (error) {
            console.error("Error procesando mensaje:", error.message);
        }
    };

    socket.onclose = () => {
        console.log("Conexión cerrada. Intentando reconectar en 3 segundos...");
        setTimeout(connectWebSocket, 3000);
    };

    socket.onerror = (error) => {
        console.error("Error de WebSocket:", error);
    };

    return socket;
};

// Crear el WebSocket por primera vez
socket = connectWebSocket();

export default socket;
