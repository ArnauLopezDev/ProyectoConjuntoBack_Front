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
<style scoped>
.event-card {
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    background-color: white;
    margin-bottom: 20px;
    text-align: center;
}

.event-card:hover {
    transform: translateY(-10px);
}

.event-card h3 {
    font-size: 24px;
    margin-bottom: 10px;
}

.event-card p {
    font-size: 16px;
    line-height: 1.6;
}

.event-thumbnail {
    max-width: 100%;
    height: auto;
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