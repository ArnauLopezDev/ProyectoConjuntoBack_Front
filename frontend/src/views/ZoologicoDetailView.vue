<template>
    <div class="zoologico-detail-view">
        <div v-if="loading" class="loading">Loading zoologico details...</div>
        <div v-if="error" class="error">Error: {{ error }}</div>
        <div v-if="!loading && !error && zoologico" class="zoologico-content">
            <h1>{{ zoologico.name }}</h1>
            <div class="details-container">
                <img v-if="zoologico.image" :src="zoologico.image" :alt="zoologico.name" class="zoologico-image" />
                <div class="zoologico-info">
                    <h2>Descripcion:</h2>
                    <p> {{ zoologico.description }}</p>
                    <br>
                    <h2>Servicios:</h2>
                    <p> {{ zoologico.services }}</p>
                    <br>
                    <h2>Animales:</h2>
                    <AnimalsListView></AnimalsListView>
                    <br>
                    <h2>Horarios:</h2>
                    <p>{{ zoologico.horarios }}</p>
                    <br>
                    <h2>Entradas:</h2>
                    <p>{{ zoologico.entradas }}</p>
                    <br>
                    <h2>Ubicacion:</h2>
                    <iframe src="{{ zoologico.mapa }}"></iframe>
                    <br>
                    <h2>Eventos: </h2>
                    <div v-for="event in events" :key="event.id_evento">
                        <h3>{{ event.name }}</h3>
                        <p>Fecha: {{ event.date }}</p>
                        <p>Horario: {{ event.time }}</p>
                        <p>Ubicacion: {{ event.location }}</p>
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
const zoologico = ref(null);
const loading = ref(true);
const error = ref(null);
const props = defineProps(["zoologicoid"]);
const events = ref([]);
async function fetchZoologico() {
    try {
        const response = await api.get(`/${props.zoologicoid}`);
        zoologico.value = response.data;
        console.log(response.data);
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
}
async function fetchEventswithIdZoo() {
    try {
        const response = await api.get(`/eventos/${props.zoologicoid}`);
        events.value = response.data;
        console.log(response.data);
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
}
onMounted(async () => {
    await fetchZoologico();
    await fetchEventswithIdZoo();
    // Listen for updates specific to this animal
    // const eventName = `animal-update-${route.params.id}`;
    // socket.on(eventName, (updatedAnimal) => {
    //     animal.value = updatedAnimal;
    // });
});

// onBeforeUnmount(() => {
//     const eventName = `animal-update-${route.params.id}`;
//     socket.off(eventName);
// });
</script>