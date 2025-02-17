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

<style scoped>
.zoologico-list {
    font-family: Arial, sans-serif;
    padding: 20px;
    max-width: 1000px;
    margin: 0 auto;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0);
}

.zoologico-list h1 {
    font-size: 36px;
    text-align: center;
    margin-bottom: 20px;
    color: #000000;
}

.loading, .error {
    text-align: center;
    font-size: 18px;
    margin-top: 20px;
    color: #555;
}

.zoologico-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.zoologico-card {
    border: 1px solid #dddddd83;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    background-color: #fff;
}
.zoologico-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}


</style>
