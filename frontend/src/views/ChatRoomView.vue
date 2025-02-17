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
            roomName: "", // Room name to identify the chat room
        };
    },
    mounted() {
        // Save the user in localStorage if it's not already set
        localStorage.setItem("chatUser", this.user);

        // Get the room name from the URL (it could be dynamic based on the route)
        const pathSegments = window.location.pathname.split("/");
        this.roomName = pathSegments[pathSegments.length - 1] || "default";

        // Send a 'join' message to the WebSocket server to join the room,
        // including the user field.
        const joinMessage = { type: "join", room: this.roomName, user: this.user };
        socket.send(JSON.stringify(joinMessage));

        // Listen for incoming messages from the server
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.room === this.roomName) {
                // Only show messages for the current room
                this.messages.push(data);
            }
        };

        // Handle WebSocket errors
        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
            this.messages.push({
                user: "Sistema",
                text: "Error en la conexión con el servidor.",
            });
        };
    },
    methods: {
        sendMessage() {
            if (this.message.trim() !== "") {
                const data = {
                    type: "message", // Optional but helps differentiate message types on the server
                    user: this.user,
                    text: this.message,
                    room: this.roomName,
                };

                // Send message to the WebSocket server
                socket.send(JSON.stringify(data));
                this.message = ""; // Clear the input field after sending the message
            }
        },
        scrollToBottom() {
            const messagesDiv = this.$refs.messages;
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        },
    },
    watch: {
        messages() {
            this.scrollToBottom(); // Scroll to the bottom when a new message is added
        },
    },
};
</script>

<style scoped>
.chat-room {
    background: var(--zoo-sand);
    /* Warm sandy tone */
    border: 3px solid var(--zoo-brown);
    border-radius: 20px;
    padding: 2rem;
    max-width: 600px;
    margin: 2rem auto;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.chat-room h2 {
    font-family: "WildWest", cursive;
    color: var(--zoo-green);
    font-size: 2rem;
    text-align: center;
    margin-bottom: 1rem;
    position: relative;
}

/* Decorative underline for the title */
.chat-room h2::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 3px;
    background: var(--zoo-sun);
    border-radius: 2px;
}

.messages {
    background: rgba(244, 231, 211, 0.3);
    padding: 1rem;
    border-radius: 15px;
    max-height: 300px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

/* Individual message styling */
.message {
    background: #fff;
    padding: 0.75rem 1rem;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-left: 4px solid var(--zoo-sun);
    font-size: 1rem;
    line-height: 1.5;
    color: var(--zoo-brown);
}

input[type="text"] {
    padding: 0.75rem 1rem;
    border: 2px solid var(--zoo-brown);
    border-radius: 10px;
    font-size: 1rem;
    color: var(--zoo-brown);
    background: var(--color-background-soft);
    transition: border-color 0.3s ease;
}

input[type="text"]:focus {
    outline: none;
    border-color: var(--zoo-green);
}

/* Custom scrollbar for the messages container */
.messages::-webkit-scrollbar {
    width: 8px;
}

.messages::-webkit-scrollbar-thumb {
    background: var(--zoo-brown);
    border-radius: 10px;
}

.messages::-webkit-scrollbar-track {
    background: rgba(244, 231, 211, 0.3);
    border-radius: 10px;
}
</style>