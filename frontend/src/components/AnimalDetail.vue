<!-- src/components/AnimalDetail.vue -->
<template>
    <div class="animal-detail">
        <div v-if="loading" class="loading">Loading animal details...</div>
        <div v-if="error" class="error">Error: {{ error }}</div>
        <div v-if="!loading && !error && animal" class="animal-content">
            <h1>{{ animal.name }}</h1>
            <div class="details-container">
                <img v-if="animal.image" :src="animal.image" :alt="animal.name" class="animal-image" />
                <div class="animal-info">
                    <p><strong>Species:</strong> {{ animal.species }}</p>
                    <p><strong>Breed:</strong> {{ animal.breed }}</p>
                    <p><strong>Age:</strong> {{ animal.age }}</p>
                    <p><strong>Description:</strong> {{ animal.description }}</p>
                    <p><strong>Status:</strong> {{ animal.status }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import api from '../services/api';

const route = useRoute();
const animal = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
    try {
        const response = await api.get(`/${route.params.id}`);
        animal.value = response.data;
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
});
</script>

<style scoped>
.animal-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.details-container {
    display: flex;
    gap: 30px;
    margin-top: 20px;
}

.animal-image {
    max-width: 500px;
    max-height: 500px;
    object-fit: cover;
    border-radius: 8px;
}

.animal-info {
    flex: 1;
}

.loading,
.error {
    padding: 20px;
    text-align: center;
}
</style>