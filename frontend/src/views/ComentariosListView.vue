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
<style scoped>
.comentarios-list {
    font-family: Arial, sans-serif;
    padding: 20px;
    max-width: 1000px;
    margin: 0 auto;
}

.comentarios-list h1 {
    font-size: 36px;
    text-align: center;
    margin-bottom: 20px;
}

.loading, .error {
    text-align: center;
    font-size: 18px;
    margin-top: 20px;
}

.comentarios-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.comentarios-card {
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.comentarios-card:hover {
    transform: translateY(-10px);
}

.no-comentarios {
    text-align: center;
    font-size: 18px;
    margin-top: 20px;
}

</style>