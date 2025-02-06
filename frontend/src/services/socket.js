// Get room ID from URL path (e.g., /chat/room123)
const getRoomId = () => {
    const pathSegments = window.location.pathname.split('/');
    return pathSegments[pathSegments.length - 1] || 'default';
};
const roomId = getRoomId();

// Get WebSocket URL dynamically
const socketUrl = import.meta.env.VITE_SOCKET_URL || "ws://localhost:3000/chat";

// Connect to WebSocket server
const socket = new WebSocket(socketUrl);

// Connection opened
socket.onopen = () => {
    console.log("Conectado al servidor WebSocket");

    // Send join room message
    const joinMessage = {
        type: 'join',
        room: roomId
    };
    socket.send(JSON.stringify(joinMessage));
};

// Handle incoming messages
socket.onmessage = (event) => {
    try {
        const data = JSON.parse(event.data);
        console.log("Mensaje recibido:", data);

        // Handle different message types
        if (data.type === 'message' && data.user && data.text) {
            console.log(`[${data.user} en ${data.room}]: ${data.text}`);
            // Add to UI or handle as needed
        }
    } catch (error) {
        console.error("Error procesando mensaje:", error.message);
    }
};

// Handle connection close
socket.onclose = () => {
    console.log("Conexión cerrada. Reconectando...");
    setTimeout(() => {
        window.location.reload(); // Or implement reconnection logic
    }, 3000); // 3 seconds delay
};

// Handle errors
socket.onerror = (error) => {
    console.error("Error de WebSocket:", error);
};

// Send message function with room inclusion
const sendMessage = (user, text) => {
    if (socket.readyState === WebSocket.OPEN) {
        const message = {
            type: 'message',
            room: roomId,
            user: user,
            text: text
        };
        socket.send(JSON.stringify(message));
    } else {
        console.error("WebSocket no conectado. Mensaje no enviado.");
    }
};

export default socket;
export { sendMessage, socket };
