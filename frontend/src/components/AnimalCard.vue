<script setup>
import { onMounted } from 'vue';

const props = defineProps(["animal"]);
onMounted(async () => {

    console.log(props.animal);
})
</script>

<template>
    <div class="animal-card">
        <h3>{{ props.animal.name }}</h3>
        <img v-if="props.animal.image" :src="props.animal.image" :alt="props.animal.name" class="animal-thumbnail" />
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