<template>
    <div class="event-detail">
        <div v-if="loading" class="loading">Loading event details...</div>
        <div v-if="error" class="error">Error: {{ error }}</div>
        <div v-if="!loading && !error && event" class="event-content">
            <h1>{{ event.name_evento }}</h1>
            <div class="details-container">
                <img v-if="event.image" :src="getImageUrl(event.image)" :alt="event.name" class="event-thumbnail" />
                <div class="event-info">
                    <p><strong>Fecha:</strong> {{ event.fecha }}</p>
                    <p><strong>Horario:</strong> {{ event.time }}</p>
                    <p><strong>Ubicación:</strong> {{ event.location }}</p>
                    <p><strong>Descripción:</strong> {{ event.descripcion }}</p>
                </div>
            </div>
        </div>
    </div>
    <Chatroom></Chatroom>
</template>

<script setup>
import Chatroom from '@/components/Chatroom.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import api from '../services/api';
const route = useRoute();
const event = ref(null);
const loading = ref(true);
const error = ref(null);
const props = defineProps(["eventid"]);
const getImageUrl = (image) => {
    return new URL(`../img/${image}`, import.meta.url).href;
};
const fetchEvent = async () => {
    try {
        const response = await api.get(`/eventos/${props.eventid}`);
        event.value = response.data;
        console.log(response.data);
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};
onMounted(async () => {
    await fetchEvent();
});
</script>

<style scoped>
.event-detail {
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

.event-content {
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.event-content h1 {
    font-size: 32px;
    margin-bottom: 20px;
    text-align: center;
}

.details-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.event-image {
    max-width: 100%;
    border-radius: 10px;
    margin-bottom: 20px;
}

.event-info {
    width: 100%;
}

.event-info p {
    font-size: 18px;
    line-height: 1.6;
    color: #666;
}

.event-info p strong {
    color: #333;
}

</style>