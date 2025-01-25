// Get the WebSocket URL dynamically using environment variables
const socketUrl = import.meta.env.VITE_SOCKET_URL || "ws://localhost:3000/chat";

// Connect to the WebSocket server
const socket = new WebSocket(socketUrl);

// Manejar apertura de conexión
socket.onopen = () => {
    console.log("Conectado al servidor WebSocket");
};

// Manejar recepción de mensajes
socket.onmessage = (event) => {
    try {
        const data = JSON.parse(event.data);
        console.log("Mensaje recibido del servidor:", data);

        // Puedes manejar los datos dependiendo del tipo de mensaje recibido
        if (data.user && data.text) {
            console.log(`[${data.user}]: ${data.text}`);
        }
    } catch (error) {
        console.error("Error al procesar el mensaje:", error.message);
    }
};

// Manejar cierre de conexión
socket.onclose = () => {
    console.log("Conexión cerrada con el servidor WebSocket");
};

// Manejar errores
socket.onerror = (error) => {
    console.error("Error en la conexión WebSocket:", error);
};

// Función para enviar mensajes al servidor WebSocket
const sendMessage = (message) => {
    console.log("WebSocket readyState:", socket.readyState); // Log the readyState
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
    } else {
        console.error("No se puede enviar el mensaje. WebSocket no está conectado.");
    }
};


// Reconectar automáticamente si la conexión se cierra
socket.onclose = () => {
    console.log("Conexión cerrada con el servidor WebSocket. Reintentando...");
    setTimeout(() => {
        window.location.reload(); // Recargar la página o implementar reconexión aquí
    }, 300000); // Reintentar después de 3 segundos
};

export default socket;
export { sendMessage, socket };
