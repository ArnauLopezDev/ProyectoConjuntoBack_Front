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