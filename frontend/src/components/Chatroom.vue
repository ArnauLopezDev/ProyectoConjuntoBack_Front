<template>
    <div class="chat-room">
        <h2>{{ roomName }}</h2>
        <div class="messages" ref="messages">
            <div class="message-input-container">
                <input type="file" accept="audio/*" @change="handleAudioUpload" ref="audioInput"
                    style="display: none;" />
                <button @click="$refs.audioInput.click()" class="audio-button">
                    🎤
                </button>
                <div v-for="(message, index) in messages" :key="index" class="message">
                    <strong>{{ message.user }}:</strong>
                    <span v-if="message.url">
                        <a>localhost:3000/{{ message.url }}</a>
                    </span>
                    <span v-else>{{ message.text }}</span>
                </div>
            </div>
            <div class="typing-indicator" v-if="typingUser">
                <em>{{ typingUser }} está escribiendo...</em>
            </div>
            <input v-model="message" type="text" placeholder="Escribe un mensaje..." @keyup.enter="sendMessage"
                @input="onTyping" />
        </div>
    </div>
</template>

<script>
import socket, { send } from "@/services/socket";
import api from '../services/api';
export default {
    mounted() {
        localStorage.setItem("chatUser", this.user);

        const animalId = this.$route.params.animalid;
        this.roomName = animalId ? `animal-${animalId}` : this.$route.name || "General";

        this.messageHandler = (event) => {
            try {
                const data = JSON.parse(event.data);
                if ((data.type === "message" || data.type === "audio") && data.room === this.roomName) {
                    this.messages.push(data);
                }
                if (data.type === "typing" && data.room === this.roomName && data.user !== this.user) {
                    this.showTypingIndicator(data.user);
                }
            } catch (error) {
                console.error("Error procesando mensaje:", error.message);
            }
        };


        socket.addEventListener('message', this.messageHandler);
    },
    beforeUnmount() { // Ciclo de vida Vue 3
        socket.removeEventListener('message', this.messageHandler);
    },

    methods: {
        async handleAudioUpload(event) {
            const file = event.target.files[0];
            if (!file) return;

            try {
                const formData = new FormData();
                formData.append('audio', file);
                formData.append('room', this.roomName);
                formData.append('user', this.user);

                const response = await api.post('/upload-audio', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                send({
                    type: "audio",
                    user: this.user,
                    room: this.roomName,
                    url: response.data.url,
                    duration: response.data.duration
                });

            } catch (error) {
                console.error('Error subiendo audio:', error);
                this.messages.push({
                    user: "Sistema",
                    text: "Error al subir el audio"
                });
            } finally {
                event.target.value = ''; // Limpiar input
            }
        },
        getAudioMimeType(url) {
            const ext = url.split('.').pop().toLowerCase();
            const types = {
                mp3: 'audio/mpeg',
                wav: 'audio/wav',
                ogg: 'audio/ogg'
            };
            return types[ext] || 'audio/*';
        },
        sendMessage() {
            if (this.message.trim() !== "") {
                send({
                    type: "message",
                    user: this.user,
                    text: this.message,
                    room: this.roomName,
                });
                this.message = "";
            }
        },

        onTyping() {
            if (this.typingEmitTimeout) clearTimeout(this.typingEmitTimeout);
            this.typingEmitTimeout = setTimeout(() => {
                send({
                    type: "typing",
                    user: this.user,
                    room: this.roomName,
                });
            }, 300);
        },
        showTypingIndicator(userName) {
            this.typingUser = userName;
            if (this.typingTimer) clearTimeout(this.typingTimer);
            // Oculta el indicador después de 2 segundos sin nuevos eventos
            this.typingTimer = setTimeout(() => {
                this.typingUser = "";
            }, 2000);
        },
        scrollToBottom() {
            const messagesDiv = this.$refs.messages;
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        },
    },
    data() {
        return {
            message: "",
            messages: [],
            user: localStorage.getItem("chatUser"),
            roomName: "",
            typingUser: "",
            typingTimer: null,
            typingEmitTimeout: null,
        };
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