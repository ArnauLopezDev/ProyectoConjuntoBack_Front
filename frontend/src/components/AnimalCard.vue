<script setup>
import { onMounted } from 'vue';

const props = defineProps(["animal"]);
onMounted(async () => {

    console.log(props.animal);
})
const getImageUrl = (image) => {
    return new URL(`../img/${image}`, import.meta.url).href;
};

</script>

<template>
    <div class="animal-card">
        <h3>{{ props.animal.name }}</h3>
        <img v-if="props.animal.image" :src="getImageUrl(props.animal.image)" :alt="props.animal.name"
            class="animal-thumbnail" />
        <p>Especie: {{ props.animal.species }}</p>
        <p>Habitat: {{ props.animal.habitat }}</p>
        <p>Estado de salud: {{ props.animal.estado_salud }}</p>
        <p>Dieta: {{ props.animal.dieta }}</p>
        <button class="btn btn-primary" @click="$router.push({
            name: 'animalesIndiv', params: {
                animalid: props.animal.id_animal
            }
        })">See
            more</button>
        <p>Animal: {{ props.animal.id_animal }}</p>
    </div>
</template>

<style scoped>
.animal-card {
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    background-color: white;
    margin-bottom: 20px;
    text-align: center;
}

.animal-card:hover {
    transform: translateY(-10px);
}

.animal-card h3 {
    font-size: 24px;
    margin-bottom: 10px;
}

.animal-card p {
    font-size: 16px;
    line-height: 1.6;
}

.animal-thumbnail {
    max-width: 100%;
    height: 500px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 20px;
}

.btn {
    display: inline-block;
    padding: 10px 20px;
    margin-top: 20px;
    background-color: #4CAF50;
    color: white;
    text-decoration: none;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s ease, transform 0.3s ease;
    cursor: pointer;
    text-align: center;
}

.btn:hover {
    background-color: #45a049;
    transform: translateY(-2px);
}

.btn:active {
    background-color: #3e8e41;
    transform: translateY(0);
}

.btn:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(72, 180, 97, 0.5);
}
</style>