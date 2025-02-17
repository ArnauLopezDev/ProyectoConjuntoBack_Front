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
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
    position: relative;
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

.zoologico-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 35px;
    padding: 25px;
    justify-content: center;
}

.zoologico-card {
    flex: 1 1 320px;
    min-width: 300px;
    max-width: 420px;
    background: var(--zoo-sand);
    border-radius: 18px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.12);
    padding: 28px;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    border: 3px solid var(--zoo-brown);
    position: relative;
    overflow: hidden;
    cursor: pointer;
}

.zoologico-card:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
}

.loading,
.error {
    text-align: center;
    font-size: 1.3rem;
    padding: 2.5rem;
    color: var(--zoo-brown);
    background: rgba(244, 231, 211, 0.9);
    border-radius: 15px;
    margin: 3rem auto;
    max-width: 550px;
    border: 2px dashed var(--zoo-brown);
    backdrop-filter: blur(4px);
}

@media (max-width: 768px) {
    .zoologico-list {
        padding: 15px;
    }

    h1 {
        font-size: 2.2rem;
        margin: 1.5rem 0;
    }

    .zoologico-grid {
        gap: 25px;
        padding: 15px;
    }

    .zoologico-card {
        flex: 1 1 100%;
        min-width: auto;
        padding: 22px;
    }
}

@media (min-width: 769px) and (max-width: 1024px) {
    .zoologico-card {
        flex: 1 1 48%;
        max-width: 48%;
    }
}

.zoologico-card::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg,
            transparent,
            rgba(245, 166, 35, 0.15),
            transparent);
    transform: rotate(45deg);
    transition: all 0.6s ease;
}

.zoologico-card:hover::before {
    animation: shine 1.4s;
}

@keyframes shine {
    0% {
        left: -50%;
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        left: 150%;
        opacity: 0;
    }
}

/* Add animal paw pattern to card background */
.zoologico-card::after {
    content: '';
    position: absolute;
    bottom: 15px;
    right: 15px;
    width: 50px;
    height: 50px;
    background-image: url('data:image/svg+xml,<svg ...>/* paw SVG */</svg>');
    opacity: 0.15;
    z-index: 1;
    transition: opacity 0.3s ease;
}

.zoologico-card:hover::after {
    opacity: 0.3;
}

/* Add subtle parallax effect on hover */
.zoologico-card:hover {
    transform:
        translateY(-10px) rotateZ(1deg) scale(1.02);
}
</style>