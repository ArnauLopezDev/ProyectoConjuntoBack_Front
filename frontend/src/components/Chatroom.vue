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
            user:
                localStorage.getItem("chatUser") ||
                "Usuario_" + Math.floor(Math.random() * 1000),
            roomName: "",
        };
    },
    mounted() {
        // Save the user in localStorage
        localStorage.setItem("chatUser", this.user);

        // Obtain the unique room identifier.
        // E.g., if the route is /animales/123, use the ID to create a unique room.
        const animalId = this.$route.params.animalid;
        console.log("Valor de animalId:", animalId);
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
            this.messages.push({
                user: "Sistema",
                text: "Error en la conexión con el servidor.",
            });
        };

        // **No join message is sent here as Socket.js already handles it.**
    },
    methods: {
        sendMessage() {
            if (this.message.trim() !== "") {
                const data = {
                    type: "message", // Helps the server distinguish message types.
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
/* Container with a warm, sandy background and earthy borders */
.chat-room {
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    background: var(--zoo-sand, #f9f4e8);
    /* fallback color if variable not set */
    border: 3px solid var(--zoo-brown, #8b5e3c);
    border-radius: 20px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

/* Title styling with a decorative underline */
.chat-room h2 {
    font-family: "WildWest", cursive;
    color: var(--zoo-green, #2e7d32);
    text-align: center;
    font-size: 2rem;
    margin-bottom: 1rem;
    position: relative;
}

.chat-room h2::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: var(--zoo-sun, #fdd835);
    border-radius: 2px;
}

/* Messages container with a soft, semi-transparent background */
.messages {
    max-height: 300px;
    overflow-y: auto;
    padding: 1rem;
    border: 1px solid var(--zoo-brown, #8b5e3c);
    border-radius: 10px;
    background: rgba(244, 231, 211, 0.3);
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

/* Individual message styling */
.message {
    background: #fff;
    padding: 0.75rem 1rem;
    border-left: 4px solid var(--zoo-sun, #fdd835);
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 1rem;
    line-height: 1.5;
    color: var(--zoo-brown, #8b5e3c);
}

.message strong {
    color: var(--zoo-green, #2e7d32);
}

/* Input field styling with smooth focus transitions */
input[type="text"] {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 2px solid var(--zoo-brown, #8b5e3c);
    border-radius: 10px;
    font-size: 1rem;
    color: var(--zoo-brown, #8b5e3c);
    background: var(--color-background-soft, #fff);
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input[type="text"]::placeholder {
    color: #aaa;
}

input[type="text"]:focus {
    outline: none;
    border-color: var(--zoo-green, #2e7d32);
    box-shadow: 0 0 5px rgba(46, 125, 50, 0.3);
}

/* Custom scrollbar for the messages container */
.messages::-webkit-scrollbar {
    width: 8px;
}

.messages::-webkit-scrollbar-thumb {
    background: var(--zoo-brown, #8b5e3c);
    border-radius: 10px;
}

.messages::-webkit-scrollbar-track {
    background: rgba(244, 231, 211, 0.3);
    border-radius: 10px;
}
</style>