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
            roomName: "",  // Room name to identify the chat room
        };
    },
    mounted() {
        // Save the user in localStorage if it's not already set
        localStorage.setItem("chatUser", this.user);

        // Get the room name from the URL (it could be dynamic based on the route)
        const pathSegments = window.location.pathname.split('/');
        this.roomName = pathSegments[pathSegments.length - 1] || 'default';

        // Send a 'join' message to the WebSocket server to join the room
        const joinMessage = { type: 'join', room: this.roomName };
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
            this.messages.push({ user: "Sistema", text: "Error en la conexión con el servidor." });
        };
    },
    methods: {
        sendMessage() {
            if (this.message.trim() !== "") {
                const data = {
                    user: this.user,
                    text: this.message,
                    room: this.roomName,
                };

                // Send message to the WebSocket server
                socket.send(JSON.stringify(data));
                this.message = "";  // Clear the input field after sending the message
            }
        },
        scrollToBottom() {
            const messagesDiv = this.$refs.messages;
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        },
    },
    watch: {
        messages() {
            this.scrollToBottom();  // Scroll to the bottom when a new message is added
        },
    },
};
</script>

<style>
.chat-room {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    max-width: 500px;
    margin: 20px auto;
    background-color: #f9f9f9;
}

.messages {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px;
    height: 300px;
    overflow-y: scroll;
    margin-bottom: 10px;
    background-color: #fff;
}

input {
    width: calc(100% - 20px);
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.25);
}

.message {
    margin-bottom: 10px;
    color: black;
}
</style>
