<template>
    <div class="chat-room">
        <h2>{{ roomName }}</h2>
        <div class="messages" ref="messages">
            <div v-for="(message, index) in messages" :key="index" class="message">
                <strong>{{ message.user }}:</strong>
                <!-- Mostrar audio si el tipo es 'audio' -->
                <span v-if="message.url">
                    Este es un mensaje
                </span>
                <!-- Mostrar texto si no es un mensaje de audio -->
                <span v-else>{{ message.text }}</span>
            </div>
        </div>
        <input v-model="message" type="text" placeholder="Escribe un mensaje..." @keyup.enter="sendMessage" />
        <input type="file" @change="handleFileChange" accept="audio/*" />
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
            audioFile: null, // Variable para manejar el archivo de audio
        };
    },
    mounted() {
        localStorage.setItem("chatUser", this.user);

        const pathSegments = window.location.pathname.split("/");
        this.roomName = pathSegments[pathSegments.length - 1] || "default";

        const joinMessage = { type: "join", room: this.roomName, user: this.user };
        socket.send(JSON.stringify(joinMessage));

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.room === this.roomName) {
                this.messages.push(data);
            }
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
            this.messages.push({
                user: "Sistema",
                text: "Error en la conexión con el servidor.",
            });
        };
    },
    methods: {
        convertUrlsToLinks(text) {
            const urlPattern = /(https?:\/\/[^\s]+)/g;
            return text.replace(urlPattern, (url) => {
                return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
            });
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
                const messageText = this.convertUrlsToLinks(this.message); // Convertir URLs a enlaces
                const data = {
                    type: "message",
                    user: this.user,
                    text: messageText, // Usar el texto procesado
                    room: this.roomName,
                };
                socket.send(JSON.stringify(data));
                this.message = "";
            }
        },

        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.audioFile = file;
                this.uploadAudio(file);
            }
        },

        async uploadAudio(file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = async () => {
                const base64Audio = reader.result;
                const duration = await this.getAudioDuration(file); // Obtener la duración antes de enviar

                // Generar la URL completa
                const audioUrl = window.location.origin + "/api/uploads/" + file.name;

                const data = {
                    type: "audio",
                    user: this.user,
                    url: audioUrl, // Usar la URL completa
                    duration: duration,
                    room: this.roomName,
                };

                socket.send(JSON.stringify(data));
            };
        },

        getAudioDuration(file) {
            return new Promise((resolve, reject) => {
                const audio = new Audio(URL.createObjectURL(file));
                audio.onloadedmetadata = () => {
                    resolve(Math.floor(audio.duration));
                };
                audio.onerror = (error) => reject(error);
            });
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
    width: 90%;
    max-width: 1200px;
    margin: 2rem auto;
    background: var(--zoo-sand);
    border: 3px solid var(--zoo-brown);
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.messages {
    background: rgba(244, 231, 211, 0.3);
    padding: 1rem;
    border-radius: 15px;
    max-height: 50vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

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

input[type="text"],
input[type="file"] {
    padding: 0.75rem 1rem;
    border: 2px solid var(--zoo-brown);
    border-radius: 10px;
    font-size: 1rem;
    color: var(--zoo-brown);
    background: var(--color-background-soft);
    transition: border-color 0.3s ease;
}

input[type="text"]:focus,
input[type="file"]:focus {
    outline: none;
    border-color: var(--zoo-green);
}

.audio-message {
    display: inline-block;
    margin-top: 10px;
}
</style>
