<template>
    <div class="chat-room">
        <h2>{{ roomName }}</h2>
        <div class="messages" ref="messages">
            <div v-for="(message, index) in messages" :key="index" class="message">
                <strong>{{ message.user }}:</strong> {{ message.text }}
            </div>
        </div>
        <input v-model="message" type="text" placeholder="Escribe un mensaje..." @keyup.enter="sendMessage" />
    </div>
</template>

<script>
import socket from "@/services/socket";

export default {
    data() {
        return {
            message: "",
            messages: [],
            user: localStorage.getItem("chatUser") || "Usuario_" + Math.floor(Math.random() * 1000),
            roomName: "",
        };
    },
    mounted() {
        // Save the user in localStorage
        localStorage.setItem("chatUser", this.user);

        // Obtain the unique room identifier.
        // E.g., if the route is /animales/123, use the ID to create a unique room.
        const animalId = this.$route.params.animalid; // Convertir a String explícitamente
        console.log("Valor de animalId:", animalId); // Para depuración
        if (animalId) {
            this.roomName = `animal-${animalId}`;
        } else {
            // If no ID, use the route name or a default value.
            this.roomName = this.$route.name || "General";
        }
        console.log("Sala de chat asignada:", this.roomName);

        // Listen for incoming messages and filter them by room.
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.room === this.roomName) {
                this.messages.push(data);
            }
        };

        // Handle WebSocket errors.
        socket.onerror = (error) => {
            console.error("Error en el WebSocket:", error);
            this.messages.push({ user: "Sistema", text: "Error en la conexión con el servidor." });
        };

        // **Remove the join message here, since Socket.js already sends it.**
        // const joinMessage = { type: 'join', room: this.roomName, user: this.user };
        // socket.send(JSON.stringify(joinMessage));
    },
    methods: {
        sendMessage() {
            if (this.message.trim() !== "") {
                const data = {
                    type: "message", // Include type to help the server distinguish message types.
                    user: this.user,
                    text: this.message,
                    room: this.roomName,
                };

                // Send message to the server.
                socket.send(JSON.stringify(data));
                this.message = "";
            }
        },
        scrollToBottom() {
            const messagesDiv = this.$refs.messages;
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        },
    },
    watch: {
        messages() {
            this.scrollToBottom();
        },
    },
};
</script>

<style scoped>
.chat-room {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.chat-room h2 {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
}

.messages {
    max-height: 300px;
    overflow-y: auto;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: white;
}

.message {
    margin-bottom: 10px;
}

.message strong {
    color: #333;
}

input[type="text"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    font-size: 16px;
}

input[type="text"]::placeholder {
    color: #aaa;
}

input[type="text"]:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
}
</style>