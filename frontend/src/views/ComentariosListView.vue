<template>
    <div class="comentarios-list">
        <h1>Comentarios</h1>
        <div v-if="loading" class="loading">Loading comentarios...</div>
        <div v-if="error" class="error">Error: {{ error }}</div>
        <div v-if="!loading && !error && comentarios.length > 0" class="comentarios-grid">
            <ComentariosCard v-for="comentario in comentarios" :key="comentario._id" :comentario="comentario"
                class="comentarios-card" />
        </div>
        <p v-if="!loading && !error && comentarios.length === 0">
            No hay comentarios para este zoológico.
        </p>
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

const fetchComentarios = async () => {
    try {
        // Se envían query parameters para filtrar los comentarios del zoológico
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
</script>