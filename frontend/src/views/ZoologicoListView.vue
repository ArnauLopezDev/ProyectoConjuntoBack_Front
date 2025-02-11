<template>
    <div class="zoologico-list">
        <h1>All Zoologicos</h1>
        <div v-if="loading" class="loading">Loading zoologicos...</div>
        <div v-if="error" class="error">Error: {{ error }}</div>
        <div v-if="!loading && !error" class="zoologico-grid">
            <ZoologicoCard v-for="zoologico in zoologicos" :key="zoologico.id_zoologico" :zoologico="zoologico"
                class="zoologico-card" />
        </div>
    </div>
</template>

<script setup>
import ZoologicoCard from '@/components/ZoologicoCard.vue';
import { onMounted, ref } from 'vue';
import api from '../services/api';

const zoologicos = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchZoologicos = async () => {
    try {
        const response = await api.get('/zoologicos');
        zoologicos.value = response.data;
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};
onMounted(async () => {
    await fetchZoologicos();
})
</script>
