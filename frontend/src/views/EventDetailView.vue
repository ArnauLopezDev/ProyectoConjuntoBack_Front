<template>
    <div class="event-detail">
        <div v-if="loading" class="loading">Loading event details...</div>
        <div v-if="error" class="error">Error: {{ error }}</div>
        <div v-if="!loading && !error && event" class="event-content">
            <h1>{{ event.name }}</h1>
            <div class="details-container">
                <img v-if="event.image" :src="event.image" :alt="event.name" class="event-image" />
                <div class="event-info">
                    <p><strong>Fecha:</strong> {{ event.date }}</p>
                    <p><strong>Horario:</strong> {{ event.time }}</p>
                    <p><strong>Ubicación:</strong> {{ event.location }}</p>
                    <p><strong>Descripción:</strong> {{ event.description }}</p>
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