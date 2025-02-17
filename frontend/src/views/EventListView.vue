<template>
    <div class="event-list">
        <h1>All Events</h1>
        <div v-if="loading" class="loading">Loading events...</div>
        <div v-if="error" class="error">Error: {{ error }}</div>
        <div v-if="!loading && !error" class="event-grid">
            <EventCard v-for="event in events" :key="event.id_evento" :event="event" class="event-card" />
        </div>
        <p v-if="!loading && !error && events.length === 0">No events found.</p>
    </div>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import EventCard from '../components/EventCard.vue';
import api from '../services/api';

const props = defineProps(["zoologicoid"]);
const events = ref([]);
const loading = ref(true);
const error = ref(null);

async function fetchEvents() {
    try {
        const endpoint = props.zoologicoid
            ? `/zoologicos/${props.zoologicoid}/eventos`
            : '/eventos';
        console.log(endpoint);
        const response = await api.get(endpoint);
        events.value = response.data;
        console.log(response.data);
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
}
onMounted(fetchEvents);
</script>
<style scoped>
.event-list {
    font-family: Arial, sans-serif;
    padding: 20px;
    max-width: 1000px;
    margin: 0 auto;
}

.event-list h1 {
    font-size: 36px;
    text-align: center;
    margin-bottom: 20px;
}

.loading, .error {
    text-align: center;
    font-size: 18px;
    margin-top: 20px;
}

.event-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.event-card {
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.event-card:hover {
    transform: translateY(-10px);
}

.no-events {
    text-align: center;
    font-size: 18px;
    margin-top: 20px;
}
</style>