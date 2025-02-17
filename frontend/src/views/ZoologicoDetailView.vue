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
                    <!-- <h2>Servicios:</h2>
                    <p>{{ zoologico.services }}</p> -->
                    <br>
                    <h2>Animales:</h2>
                    <AnimalsListView :zoologicoid="props.zoologicoid" />
                    <br>
                    <h2>Horarios:</h2>
                    <p>{{ zoologico.horario_apertura }} hasta {{ zoologico.horario_cierre }}</p>
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
