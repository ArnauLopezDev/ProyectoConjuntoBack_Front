<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps(["comentario"]);

// Reactive variables for the reply form
const replyText = ref('');
const showReplyForm = ref(false);

onMounted(() => {
    console.log(props.comentario);
});

// Show the reply form
const replyComment = () => {
    showReplyForm.value = true;
};

// Submit the reply to the API
const submitReply = async () => {
    try {
        const payload = {
            id_usuario_sql: props.comentario.id, // Or the ID of the user replying
            id_referencia_sql: props.comentario.id_referencia_sql, // e.g. the ID of the article or entity
            tipo_referencia: props.comentario.tipo_referencia, // e.g. "articulo"
            contenido: replyText.value,
            respuestas: []
        };

        const response = await fetch('http://localhost:3000/api/comentarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log('Respuesta enviada correctamente!');
            replyText.value = '';
            showReplyForm.value = false;
        } else {
            console.error('Error al enviar la respuesta');
        }
    } catch (error) {
        console.error('Error en la petición:', error);
    }
};
</script>

<template>
    <div class="comentarios-card">
        <h3>{{ props.comentario.user }}</h3>
        <p>{{ props.comentario.contenido }}</p>
        <button class="btn btn-primary" @click="replyComment">Reply</button>

        <!-- Reply form is shown when activated -->
        <form v-if="showReplyForm" class="reply-form" @submit.prevent="submitReply">
            <label for="respuesta">Respuesta:</label>
            <input type="text" id="respuesta" name="respuesta" v-model="replyText"
                placeholder="Escribe tu respuesta..." />
            <button type="submit" class="btn btn-primary">Send</button>
        </form>
    </div>
</template>

<style scoped>
/* Card container with a warm, clean look */
.comentarios-card {
    background: #fff;
    border: 3px solid var(--zoo-brown, #8b5e3c);
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    margin-bottom: 1.5rem;
}

.comentarios-card:hover {
    transform: translateY(-5px);
}

/* User name styling */
.comentarios-card h3 {
    font-family: "WildWest", cursive;
    font-size: 1.8rem;
    color: var(--zoo-green, #2e7d32);
    margin-bottom: 10px;
}

/* Comment text styled with an accent border */
.comentarios-card p {
    font-size: 1.2rem;
    line-height: 1.6;
    color: var(--zoo-brown, #8b5e3c);
    background: rgba(244, 231, 211, 0.3);
    padding: 1rem;
    border-radius: 10px;
    border-left: 4px solid var(--zoo-sun, #fdd835);
    margin-bottom: 1rem;
}

/* Button styling */
.btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    margin-top: 10px;
    background-color: var(--zoo-green, #2e7d32);
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn:hover {
    background-color: var(--zoo-sun, #fdd835);
    color: var(--zoo-brown, #8b5e3c);
    transform: translateY(-2px);
}

/* Reply form layout */
.reply-form {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.reply-form label {
    font-size: 1rem;
    color: var(--zoo-green, #2e7d32);
}

.reply-form input {
    padding: 0.75rem 1rem;
    border: 2px solid var(--zoo-brown, #8b5e3c);
    border-radius: 10px;
    font-size: 1rem;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.reply-form input::placeholder {
    color: #aaa;
}

.reply-form input:focus {
    outline: none;
    border-color: var(--zoo-green, #2e7d32);
    box-shadow: 0 0 5px rgba(46, 125, 50, 0.3);
}
</style>
