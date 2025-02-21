<template>
    <div class="zoologico-detail-view">
        <div v-if="loading" class="loading">Loading zoologico details...</div>
        <div v-if="error" class="error">Error: {{ error }}</div>
        <div v-if="!loading && !error && zoologico" class="zoologico-content">
            <h1>{{ zoologico.name }}</h1>
            <div class="details-container">
                <img v-if="zoologico.image" :src="zoologico.image" :alt="zoologico.name" class="zoologico-image" />
                <div class="zoologico-info">
                    <h2>Descripción:</h2>
                    <p>{{ zoologico.description }}</p>
                    <br>
                    <h2>Servicios:</h2>
                    <p>{{ zoologico.services }}</p>
                    <br>
                    <h2>Animales:</h2>
                    <AnimalsListView :zoologicoid="props.zoologicoid" />
                    <br>
                    <h2>Horarios:</h2>
                    <p>{{ zoologico.horarios }}</p>
                    <br>
                    <h2>Entradas:</h2>
                    <p>{{ zoologico.entradas }}</p>
                    <br>
                    <h2>Ubicación:</h2>
                    <iframe v-if="zoologico.mapa" :src="zoologico.mapa"></iframe>
                    <br>
                    <h2>Eventos:</h2>
                    <div>
                        <EventListView :zoologicoid="props.zoologicoid" />
                    </div>

                    <ComentarioDetailView :zoologicoid="props.zoologicoid" />

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import api from '../services/api';
import AnimalsListView from './AnimalsListView.vue';
import ComentarioDetailView from './ComentariosListView.vue';
import EventListView from './EventListView.vue';
const props = defineProps(["zoologicoid"]);
const zoologico = ref(null);
const loading = ref(true);
const error = ref(null);
const loadingCount = ref(2);
async function fetchZoologico() {
    try {
        const response = await api.get(`/zoologicos/${props.zoologicoid}`);
        zoologico.value = response.data;
        console.log(response.data);
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
}
// async function fetchEventswithIdZoo() {
//     try {
//         const response = await api.get(`/eventos/${props.zoologicoid}`);
//         events.value = response.data;
//     } catch (err) {
//         error.value = err.message;
//     } finally {
//         loadingCount.value--;
//         if (loadingCount.value === 0) loading.value = false;
//     }
// }

onMounted(() => {
    fetchZoologico();
    // fetchEventswithIdZoo();
});
</script>
<style scoped>
.zoologico-detail-view {
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    padding: 20px;
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

.zoologico-content {
    border-radius: 20px;
    padding: 2.5rem;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;
}

.zoologico-content h1 {
    font-family: 'WildWest', cursive;
    color: var(--zoo-green);
    font-size: 2.8rem;
    text-align: center;
    margin-bottom: 2.5rem;
    position: relative;
    padding-bottom: 1.5rem;
}

.zoologico-content h1::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 4px;
    background: var(--zoo-sun);
    border-radius: 2px;
}


.zoologico-image {
    width: 100%;
    max-height: 500px;
    object-fit: cover;
    border-radius: 15px;
    border: 3px solid var(--zoo-brown);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.zoologico-image:hover {
    transform: scale(1.02);
}

.zoologico-info {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.zoologico-info h2 {
    font-family: 'WildWest', cursive;
    color: var(--zoo-green);
    font-size: 1.8rem;
    margin-bottom: 1rem;
    position: relative;
    padding-left: 2rem;
}

.zoologico-info h2::before {
    content: '🐾';
    position: absolute;
    left: 0;
    top: -0.2rem;
    font-size: 1.2rem;
}

.zoologico-info p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: var(--zoo-brown);
    background: rgba(244, 231, 211, 0.3);
    padding: 1.5rem;
    border-radius: 10px;
    border-left: 4px solid var(--zoo-sun);
}

.zoologico-info iframe {
    width: 100%;
    height: 400px;
    border: none;
    border-radius: 15px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    margin: 1rem 0;
}

.comentarios-container {
    margin-top: 3rem;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 15px;
    border: 2px solid var(--zoo-brown);
}

.comentarios-container h2 {
    font-family: 'WildWest', cursive;
    color: var(--zoo-green);
    font-size: 2rem;
    margin-bottom: 1.5rem;
    text-align: center;
}

@media (min-width: 1024px) {
    .details-container {
        grid-template-columns: 1fr 1fr;
        align-items: start;
    }

    .zoologico-info h2 {
        font-size: 2rem;
    }

    .zoologico-info p {
        font-size: 1.2rem;
    }
}

@media (max-width: 768px) {
    .zoologico-content {
        padding: 1.5rem;
    }

    .zoologico-content h1 {
        font-size: 2rem;
    }

    .zoologico-info h2 {
        font-size: 1.5rem;
    }
}

/* Decorative animal tracks */
.zoologico-content::after {
    content: '';
    position: absolute;
    bottom: -30px;
    right: -30px;
    width: 100px;
    height: 100px;
    background-image: url('data:image/svg+xml,<svg ...>/* paw SVG */</svg>');
    opacity: 0.1;
    transform: rotate(25deg);
}
</style>