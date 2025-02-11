<!-- src/components/AnimalsList.vue -->
<template>
    <div class="animals-list">
        <h1>All Animals</h1>
        <div v-if="loading" class="loading">Loading animals...</div>
        <div v-if="error" class="error">Error: {{ error }}</div>
        <div v-if="!loading && !error && animals.length > 0" class="animal-grid">
            <AnimalCard v-for="animal in animals" :key="animal.id_animal" :animal="animal" class="animal-card" />
        </div>
        <p v-if="!loading && !error && animals.length === 0">No animals found.</p>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import AnimalCard from '../components/AnimalCard.vue';
import api from '../services/api';

const props = defineProps(["zoologicoid"]);
const animals = ref([]);
const loading = ref(true);
const error = ref(null);

async function fetchAnimals() {
    try {
        const endpoint = props.zoologicoid
            ? `/zoologicos/${props.zoologicoid}/animals`
            : '/animals';
        console.log(endpoint);
        const response = await api.get(endpoint);
        animals.value = response.data;
    } catch (err) {
        console.error("Error fetching animals:", err);
        error.value = err.message;
    } finally {
        loading.value = false;
    }
}

onMounted(fetchAnimals);
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
