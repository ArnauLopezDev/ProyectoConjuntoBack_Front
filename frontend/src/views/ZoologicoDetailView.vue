<template>
    <div class="zoologico-detail-view">
        <div v-if="loading" class="loading">Loading zoologico details...</div>
        <div v-if="error" class="error">Error: {{ error }}</div>
        <div v-if="!loading && !error && zoologico" class="zoologico-content">
            <h1>{{ zoologico.name }}</h1>
            <div class="details-container">
                <img v-if="zoologico.image" :src="zoologico.image" :alt="zoologico.name" class="zoologico-image" />
                <div class="zoologico-info">
                    <h2>Descripción:</h2>
                    <p>{{ zoologico.description }}</p>
                    <br>
                    <h2>Servicios:</h2>
                    <p>{{ zoologico.services }}</p>
                    <br>
                    <h2>Animales:</h2>
                    <AnimalsListView :zoologicoid="props.zoologicoid" />
                    <br>
                    <h2>Horarios:</h2>
                    <p>{{ zoologico.horarios }}</p>
                    <br>
                    <h2>Entradas:</h2>
                    <p>{{ zoologico.entradas }}</p>
                    <br>
                    <h2>Ubicación:</h2>
                    <iframe v-if="zoologico.mapa" :src="zoologico.mapa"></iframe>
                    <br>
                    <h2>Eventos:</h2>
                    <div>
                        <EventListView :zoologicoid="props.zoologicoid" />
                    </div>
                    <div class="comentarios-container">
                        <h2>Comentarios:</h2>
                        <ComentarioDetailView :zoologicoid="props.zoologicoid" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import api from '../services/api';
import AnimalsListView from './AnimalsListView.vue';
import ComentarioDetailView from './ComentariosListView.vue';
import EventListView from './EventListView.vue';
const props = defineProps(["zoologicoid"]);
const zoologico = ref(null);
const loading = ref(true);
const error = ref(null);
const loadingCount = ref(2);
async function fetchZoologico() {
    try {
        const response = await api.get(`/zoologicos/${props.zoologicoid}`);
        zoologico.value = response.data;
        console.log(response.data);
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
}
// async function fetchEventswithIdZoo() {
//     try {
//         const response = await api.get(`/eventos/${props.zoologicoid}`);
//         events.value = response.data;
//     } catch (err) {
//         error.value = err.message;
//     } finally {
//         loadingCount.value--;
//         if (loadingCount.value === 0) loading.value = false;
//     }
// }

onMounted(() => {
    fetchZoologico();
    // fetchEventswithIdZoo();
});
</script>
<style scoped>
.zoologico-detail-view {
    font-family: Arial, sans-serif;
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
}

.loading, .error {
    text-align: center;
    font-size: 18px;
    margin-top: 20px;
}

.zoologico-content {
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.zoologico-content h1 {
    font-size: 32px;
    margin-bottom: 20px;
    text-align: center;
}

.details-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.zoologico-image {
    max-width: 100%;
    border-radius: 10px;
    margin-bottom: 20px;
}

.zoologico-info {
    width: 100%;
}

.zoologico-info h2 {
    font-size: 24px;
    margin-top: 20px;
    margin-bottom: 10px;
    color: #333;
}

.zoologico-info p {
    font-size: 18px;
    line-height: 1.6;
    color: #666;
}

.zoologico-info iframe {
    width: 100%;
    height: 400px;
    border: none;
    border-radius: 10px;
    margin-top: 10px;
    margin-bottom: 20px;
}

.comentarios-container {
    margin-top: 30px;
}

.comentarios-container h2 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #333;
}

</style>