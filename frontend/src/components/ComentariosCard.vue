<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps(["comentario"]);

// Variables reactivas para el formulario de respuesta
const replyText = ref('');
const showReplyForm = ref(false);

onMounted(() => {
    console.log(props.comentario);
});

// Muestra el formulario de respuesta
const replyComment = () => {
    showReplyForm.value = true;
};

// Envía la respuesta a la API
const submitReply = async () => {
    try {
        const payload = {
            id_usuario_sql: props.comentario.id, // O el id del usuario que está respondiendo
            id_referencia_sql: props.comentario.id_referencia_sql, // Por ejemplo, el id del artículo o entidad
            tipo_referencia: props.comentario.tipo_referencia, // Ej.: "articulo"
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
        <p>{{ props.comentario.comentario }}</p>
        <button class="btn btn-primary" @click="replyComment">Reply</button>

        <!-- Se muestra el formulario de respuesta solo si se activa -->
        <form v-if="showReplyForm" class="reply-form" @submit.prevent="submitReply">
            <label for="respuesta">Respuesta:</label>
            <input type="text" id="respuesta" name="respuesta" v-model="replyText"
                placeholder="Escribe tu respuesta..." />
            <button type="submit" class="btn btn-primary">Send</button>
        </form>
    </div>
</template>

<style scoped>
.comentarios-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    transition: transform 0.2s;
}

.reply-form {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>
