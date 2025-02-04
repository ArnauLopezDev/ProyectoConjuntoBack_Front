<!-- src/components/AnimalsList.vue -->
<template>
    <div class="animals-list">
        <h1>All Animals</h1>
        <div v-if="loading" class="loading">Loading animals...</div>
        <div v-if="error" class="error">Error: {{ error }}</div>

        <div v-if="!loading && !error" class="animal-grid">
            <animalCard v-for="animal in animals" :key="animal.id_animal" :animal="animal" class="animal-card">

            </animalCard>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import api from '../services/api';
import animalCard from './AnimalCard.vue';
const animals = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
    try {
        const response = await api.get('/');
        console.log(response.data);
        animals.value = response.data;
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
});
</script>

<style scoped>
.animal-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
}

.animal-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    transition: transform 0.2s;
}

.animal-card:hover {
    transform: translateY(-5px);
}

.animal-thumbnail {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
}

.loading,
.error {
    padding: 20px;
    text-align: center;
}
</style>