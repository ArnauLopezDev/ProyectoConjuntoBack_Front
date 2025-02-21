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
.animals-list {
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    padding: 20px;
}

h1 {
    text-align: center;
    font-family: 'WildWest', cursive;
    color: var(--zoo-green);
    font-size: 2.8rem;
    margin: 2rem 0 3rem;
    position: relative;
    padding-bottom: 1.5rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

h1::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 4px;
    background: var(--zoo-sun);
    border-radius: 2px;
}

.animal-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    padding: 20px;
}

.animal-card {
    background: var(--zoo-sand);
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    padding: 20px;
    transition: all 0.3s ease;
    border: 2px solid var(--zoo-brown);
    position: relative;
    overflow: hidden;
    max-width: 40vw;
}

.animal-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.animal-card::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg,
            transparent,
            rgba(245, 166, 35, 0.1),
            transparent);
    transform: rotate(45deg);
    transition: all 0.5s ease;
}

.animal-card:hover::before {
    animation: shine 1.5s;
}

@keyframes shine {
    0% {
        left: -50%;
    }

    100% {
        left: 150%;
    }
}

.animal-thumbnail {
    width: 100%;
    height: 220px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 15px;
    border: 2px solid var(--zoo-brown);
}

.btn {
    background-color: var(--zoo-sun);
    color: var(--zoo-green);
    padding: 12px 25px;
    border-radius: 8px;
    font-weight: 600;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
}

.btn:hover {
    background-color: var(--zoo-green);
    color: var(--zoo-sand);
    transform: translateY(-3px);
}

.loading,
.error {
    text-align: center;
    font-size: 1.2rem;
    padding: 2rem;
    color: var(--zoo-brown);
    background: rgba(244, 231, 211, 0.8);
    border-radius: 10px;
    margin: 2rem auto;
    max-width: 500px;
}

@media (max-width: 768px) {
    .animal-grid {
        grid-template-columns: 1fr;
        gap: 20px;
    }

    h1 {
        font-size: 2rem;
    }
}

/* Animal tracks pattern between cards */
.animal-card::after {
    content: '';
    position: absolute;
    bottom: -15px;
    right: -15px;
    width: 40px;
    height: 40px;
    background-image: url('data:image/svg+xml,<svg ...>/* paw SVG */</svg>');
    opacity: 0.3;
    transition: opacity 0.3s ease;
}

.animal-card:hover::after {
    opacity: 0.8;
}
</style>