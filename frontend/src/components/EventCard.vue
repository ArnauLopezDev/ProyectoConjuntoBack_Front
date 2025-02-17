<script setup>
import { onMounted } from 'vue';
const props = defineProps(["event"]);
onMounted(async () => {
    console.log(props.event);
})
</script>

<template>
    <div class="event-card">
        <h3>{{ props.event.name_evento }}</h3>
        <img v-if="props.event.image" :src="props.event.image" :alt="props.event.name" class="event-thumbnail" />
        <p>Fecha: {{ props.event.fecha }}</p>
        <p>Horario: {{ props.event.tiempo }}</p>
        <p>Ubicacion: {{ props.event.location }}</p>
        <p>Descripcion: {{ props.event.descripcion }}</p>
        <button class="btn btn-primary" @click="$router.push({
            name: 'eventosIndiv', params: {
                eventid: props.event.id_evento
            }
        })">See
            more</button>
    </div>
</template>