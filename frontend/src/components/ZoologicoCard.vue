<script setup>
import { onMounted, ref } from 'vue';
const props = defineProps(["zoologico"]);
onMounted(async () => {
    console.log(props.zoologico);
})
</script>
<template>
    <div class="zoologico-card">
        <h3>{{ props.zoologico.name }}</h3>
        <p> {{ props.zoologico.description }}</p>
        <hr>
        <br>
        <p> {{ props.zoologico.services }}</p>
        <hr>
        <br>
        <p>{{props.zoologico.animales}}</p>
        <hr>
        <br>
        <p>{{props.zoologico.horarios}}</p>
        <hr>
        <br>
        <p>{{props.zoologico.entradas}}</p>
        <hr>
        <br>
        <p>{{props.zoologico.mapa}}</p>
    </div>
</template>