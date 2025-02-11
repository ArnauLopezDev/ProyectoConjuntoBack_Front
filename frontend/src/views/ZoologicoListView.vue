<template>
    <div class="zoologico-list">
        <h1>All Zoologicos</h1>
        <div v-if="loading" class="loading">Loading zoologicos...</div>
        <div v-if="error" class="error">Error: {{ error }}</div>
        <div v-if="!loading && !error" class="zoologico-grid">
            <zoologicoCard v-for="zoologico in zoologicos" :key="zoologico.id_zoologico" :zoologico="zoologico"
                class="zoologico-card">
            </zoologicoCard>
        </div>
    </div>
</template>


<script setup>
import { onMounted } from 'vue';
import api from '../services/api';
const zoologicos = ref([]);
const loading = ref(true);
const error = ref(null);
async function fetchZoologicos() {
    try {
        const response = await api.get('/zoologicos');
        zoologicos.value = response.data;
        loading.value = false;
    } catch (err) {
        error.value = err.message;
        loading.value = false;
    }
    finally {
        loading.value = false;
    }
};
onMounted(async () => {
    await fetchZoologicos();
})
</script>