<template>
    <div class="animal-detail">
        <div v-if="loading" class="loading">Loading animal details...</div>
        <div v-if="error" class="error">Error: {{ error }}</div>
        <div v-if="!loading && !error && animal" class="animal-content">
            <h1>{{ animal.name }}</h1>
            <div class="details-container">
                <img v-if="animal.image" :src="getImageUrl(animal.image)" :alt="animal.name" class="animal-thumbnail" />
                <div class="animal-info">
                    <p><strong>Species:</strong> {{ animal.species }}</p>
                    <p><strong>Habitat:</strong> {{ animal.habitat }}</p>
                    <p><strong>Dieta:</strong> {{ animal.dieta }}</p>
                    <!-- <p>Numero Visitas {{ visitas.length }}</p> -->
                    <p>Puntuacion: {{ animal.puntuacion }}</p>
                    <label for="puntuacion">Como puntua a este animal?</label>
                    <select id="puntuacion" v-model="animal.puntuacion">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <button @click="submitPuntuacion">Submit</button>
                </div>
            </div>
        </div>
    </div>
    <Chatroom></Chatroom>
</template>

<script setup>
import Chatroom from '@/components/Chatroom.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import api from '../services/api';

const route = useRoute();
const animal = ref(null);
const loading = ref(true);
const error = ref(null);
const props = defineProps(["animalid"]);

const getImageUrl = (image) => {
    return new URL(`../img/${image}`, import.meta.url).href;
};
const getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};
const submitPuntuacion = async () => {
    try {
        const payload = {
            puntuacion: animal.value.puntuacion
        };
        const response = await fetch(`http://localhost:3000/api/animals/${props.animalid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        if (response.ok) {
            console.log('Puntuacion actualizada exitosamente');
        } else {
            console.error('Error al actualizar la puntuacion');
        }
    } catch (error) {
        console.error('Error al actualizar la puntuacion:', error);
    }
};

// const submitNewVisita = async () => {
//     try {
//         const payload = {
//             id_usuario_sql: getUser().id,
//             id_referencia_sql: props.animalid

//         };
//         const response = await fetch('http://localhost:3000/api/visitas', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(payload)
//         });
//         if (response.ok) {
//             console.log('Visita creada exitosamente');
//         } else {
//             console.error('Error al crear la visita');
//         }
//     } catch (error) {
//         console.error('Error al crear la visita:', error);
//     }
// };
// const visitas = ref([]);
// const fetchVisitas = async () => {
//     try {
//         const response = await fetch('http://localhost:3000/api/visitas');
//         const data = await response.json();
//         visitas = data;
//         return data;
//     } catch (error) {
//         console.error('Error al obtener las visitas:', error);
//         return [];
//     }
// };
async function fetchAnimal() {
    try {
        const response = await api.get(`/animals/${props.animalid}`);
        animal.value = response.data;
        console.log(response.data);
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
}

onMounted(async () => {
    await fetchAnimal();
    await fetchVisitas();
    submitNewVisita();
});
</script>

<style scoped>
.animal-detail {
    max-width: 1500px;
    margin: 2rem auto;
    background: var(--zoo-sand);
    border-radius: 20px;
    padding: 2.5rem;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    border: 3px solid var(--zoo-brown);
    position: relative;
    margin-top: 5rem;
    overflow: hidden;
}

.animal-content {
    max-width: 1000px;
    margin: 0 auto;
}

/* Title styling with a decorative underline */
.animal-detail h1 {
    font-family: 'WildWest', cursive;
    color: var(--zoo-green);
    font-size: 2.8rem;
    text-align: center;
    margin-bottom: 2.5rem;
    position: relative;
    padding-bottom: 1.5rem;
}

.animal-detail h1::after {
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

/* Layout: stack on small screens; side-by-side on larger ones */
.details-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-top: 20px;
}

@media (min-width: 768px) {
    .details-container {
        flex-direction: row;
        gap: 2.5rem;
    }
}

/* Image styling with a subtle hover effect */
.animal-thumbnail {
    width: 100%;
    max-width: 500px;
    max-height: 500px;
    object-fit: cover;
    border-radius: 15px;
    border: 3px solid var(--zoo-brown);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.animal-thumbnail:hover {
    transform: scale(1.02);
}

/* Information styling with a colored border accent */
.animal-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.animal-info p {
    font-size: 1.2rem;
    line-height: 1.6;
    color: var(--zoo-brown);
    background: rgba(244, 231, 211, 0.3);
    padding: 1.5rem;
    border-radius: 10px;
    border-left: 4px solid var(--zoo-sun);
}

/* Loading and error messages styled consistently */
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
</style>