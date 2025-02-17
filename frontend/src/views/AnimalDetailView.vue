<!-- src/components/AnimalDetail.vue -->
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
                    <!-- <p><strong>Breed:</strong> {{ animal.breed }}</p>
                    <p><strong>Age:</strong> {{ animal.age }}</p>
                    <p><strong>Description:</strong> {{ animal.description }}</p>
                    <p><strong>Status:</strong> {{ animal.status }}</p> -->
                    <p><strong>habitat:</strong> {{ animal.habitat }}</p>
                    <p><strong>dieta:</strong> {{ animal.dieta }}</p>
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
async function fetchAnimal() {
    try {
        const response = await api.get(`/animals/  ${props.animalid}`);
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
    // Listen for updates specific to this animal
    // const eventName = `animal-update-${route.params.id}`;
    // socket.on(eventName, (updatedAnimal) => {
    //     animal.value = updatedAnimal;
    // });
});

// onBeforeUnmount(() => {
//     const eventName = `animal-update-${route.params.id}`;
//     socket.off(eventName);
// });
</script>

<style scoped>
.animal-detail {
    font-family: Arial, sans-serif;
    padding: 20px;
    max-width: 1000px;
    margin: 0 auto;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.animal-content {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
}

.details-container {
    display: flex;
    gap: 30px;
    margin-top: 20px;
}

.animal-thumbnail {
    max-width: 500px;
    max-height: 500px;
    object-fit: cover;
    border-radius: 8px;
}

.animal-info {
    flex: 1;
}

.animal-info p {
    font-size: 18px;
    line-height: 1.6;
}

.loading,
.error {
    padding: 20px;
    text-align: center;
    font-size: 18px;
}

h1 {
    text-align: center;
    font-size: 32px;
    margin-bottom: 20px;
}
</style>
