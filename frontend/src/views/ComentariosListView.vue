<template>
    <div class="comentarios-list">
        <h1>Comentarios</h1>
        <div v-if="loading" class="loading">Loading comentarios...</div>
        <div v-if="error" class="error">Error: {{ error }}</div>
        <div v-if="!loading && !error && comentarios.length > 0" class="comentarios-grid">
            <ComentariosCard v-for="comentario in comentarios" :key="comentario._id" :comentario="comentario"
                class="comentarios-card" />
        </div>
        <p v-if="!loading && !error && comentarios.length === 0" class="no-comentarios">
            No hay comentarios para este zoológico.
        </p>

        <!-- Add Comment Button -->
        <div class="add-comment">
            <button class="btn-add" @click="addComment">Agregar Comentario</button>
        </div>

        <!-- Add Comment Form -->
        <div v-if="showAddCommentForm" class="add-comment-form">
            <textarea v-model="newCommentText" placeholder="Escribe tu comentario..."></textarea>
            <div class="form-buttons">
                <button class="btn btn-primary" @click="submitNewComment">Enviar</button>
                <button class="btn btn-secondary" @click="cancelAddComment">Cancelar</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import ComentariosCard from '@/components/ComentariosCard.vue';
import { onMounted, ref } from 'vue';
import api from '../services/api';

const props = defineProps(["zoologicoid"]);
const comentarios = ref([]);
const loading = ref(true);
const error = ref(null);

// Reactive variables for the add comment form
const showAddCommentForm = ref(false);
const newCommentText = ref('');

const fetchComentarios = async () => {
    try {
        // Query parameters to filter comments for this zoo
        const endpoint = props.zoologicoid
            ? `/comentarios?tipo_referencia=zoologico&id_referencia_sql=${props.zoologicoid}`
            : '/comentarios';
        console.log(endpoint);
        const response = await api.get(endpoint);
        comentarios.value = response.data;
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};

onMounted(fetchComentarios);

const addComment = () => {
    showAddCommentForm.value = true;
};

const cancelAddComment = () => {
    showAddCommentForm.value = false;
    newCommentText.value = '';
};

const submitNewComment = async () => {
    try {
        const payload = {
            // Assumes the new comment is for the current zoologico.
            id_referencia_sql: props.zoologicoid,
            tipo_referencia: 'zoologico',
            contenido: newCommentText.value,
            user: localStorage.getItem("commentUser")
        };

        const response = await api.post('/comentarios', payload);
        if (response.status === 201 || response.status === 200) {
            console.log('Comentario agregado correctamente!');
            // Append the new comment to the list (or refetch the comments)
            comentarios.value.push(response.data);
            newCommentText.value = '';
            showAddCommentForm.value = false;
        } else {
            console.error('Error al agregar el comentario');
        }
    } catch (err) {
        console.error('Error en la petición:', err);
    }
};
</script>

<style scoped>
/* Container with a warm, sandy background and earthy accents */
.comentarios-list {
    max-width: 1000px;
    margin: 2rem auto;
    padding: 2rem;
    background: var(--zoo-sand, #f9f4e8);
    border: 3px solid var(--zoo-brown, #8b5e3c);
    border-radius: 20px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
}

/* Title styling with a decorative underline */
.comentarios-list h1 {
    font-family: "WildWest", cursive;
    font-size: 2.8rem;
    text-align: center;
    color: var(--zoo-green, #2e7d32);
    margin-bottom: 2rem;
    position: relative;
    padding-bottom: 1rem;
}

.comentarios-list h1::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 4px;
    background: var(--zoo-sun, #fdd835);
    border-radius: 2px;
}

/* Loading and error messages styled for clarity */
.loading,
.error {
    text-align: center;
    font-size: 1.3rem;
    padding: 2rem;
    color: var(--zoo-brown, #8b5e3c);
    background: rgba(244, 231, 211, 0.9);
    border-radius: 15px;
    margin: 2rem auto;
    max-width: 550px;
    border: 2px dashed var(--zoo-brown, #8b5e3c);
    backdrop-filter: blur(4px);
}

/* Grid layout for comentarios cards */
.comentarios-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 2rem;
}

/* Individual comentario card styling */
.comentarios-card {
    background: #fff;
    border: 3px solid var(--zoo-brown, #8b5e3c);
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.comentarios-card:hover {
    transform: translateY(-5px);
}

/* Style for the message when there are no comentarios */
.no-comentarios {
    text-align: center;
    font-size: 1.3rem;
    margin-top: 2rem;
    color: var(--zoo-brown, #8b5e3c);
}

/* Container for the add comment button */
.add-comment {
    text-align: center;
    margin-top: 2rem;
}

/* Styling for the "Agregar Comentario" button */
.btn-add {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: var(--zoo-green, #2e7d32);
    color: #fff;
    border: none;
    border-radius: 10px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn-add:hover {
    background-color: var(--zoo-sun, #fdd835);
    color: var(--zoo-brown, #8b5e3c);
    transform: translateY(-2px);
}

/* Add Comment Form styling */
.add-comment-form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.add-comment-form textarea {
    width: 100%;
    padding: 1rem;
    border: 2px solid var(--zoo-brown, #8b5e3c);
    border-radius: 10px;
    font-size: 1rem;
    resize: vertical;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.add-comment-form textarea:focus {
    outline: none;
    border-color: var(--zoo-green, #2e7d32);
    box-shadow: 0 0 5px rgba(46, 125, 50, 0.3);
}

.form-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
}

.btn.btn-primary {
    background-color: var(--zoo-green, #2e7d32);
    color: #fff;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn.btn-primary:hover {
    background-color: var(--zoo-sun, #fdd835);
    color: var(--zoo-brown, #8b5e3c);
    transform: translateY(-2px);
}

.btn.btn-secondary {
    background-color: var(--zoo-brown, #8b5e3c);
    color: #fff;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn.btn-secondary:hover {
    background-color: var(--zoo-green, #2e7d32);
    transform: translateY(-2px);
}
</style>