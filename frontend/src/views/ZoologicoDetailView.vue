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
                    <AnimalsListView />
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
                    <div v-if="events.length > 0">
                        <div v-for="event in events" :key="event.id_evento">
                            <h3>{{ event.name }}</h3>
                            <p>Fecha: {{ event.date }}</p>
                            <p>Horario: {{ event.time }}</p>
                            <p>Ubicación: {{ event.location }}</p>
                        </div>
                    </div>
                    <p v-else>No hay eventos disponibles.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import api from '../services/api';
import AnimalsListView from './AnimalsListView.vue';

const props = defineProps(["zoologicoid"]);
const zoologico = ref(null);
const events = ref([]);
const loading = ref(true);
const error = ref(null);
const loadingCount = ref(2);

async function fetchZoologico() {
    try {
        const response = await api.get(`/zoologicos/${props.zoologicoid}`);
        zoologico.value = response.data;
    } catch (err) {
        error.value = err.message;
    } finally {
        loadingCount.value--;
        if (loadingCount.value === 0) loading.value = false;
    }
}

async function fetchEventswithIdZoo() {
    try {
        const response = await api.get(`/eventos/${props.zoologicoid}`);
        events.value = response.data;
    } catch (err) {
        error.value = err.message;
    } finally {
        loadingCount.value--;
        if (loadingCount.value === 0) loading.value = false;
    }
}

onMounted(() => {
    fetchZoologico();
    fetchEventswithIdZoo();
});
</script>
