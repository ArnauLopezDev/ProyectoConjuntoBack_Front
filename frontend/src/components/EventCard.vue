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
    border: 3px solid var(--zoo-brown, #8b5e3c);
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    background: var(--zoo-sand, #f9f4e8);
    margin-bottom: 20px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.event-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

/* Títulos con fuente decorativa */
.event-card h3 {
    font-family: "WildWest", cursive;
    font-size: 2rem;
    color: var(--zoo-green, #2e7d32);
    margin-bottom: 10px;
}

/* Estilos para los detalles del evento */
.event-card p {
    font-size: 1rem;
    color: var(--zoo-brown, #8b5e3c);
    line-height: 1.6;
}

/* Imagen del evento */
.event-thumbnail {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    margin-bottom: 15px;
    border: 2px solid var(--zoo-brown, #8b5e3c);
}

/* Botón con efecto dinámico */
.btn {
    display: inline-block;
    padding: 12px 24px;
    margin-top: 15px;
    font-size: 1rem;
    font-weight: bold;
    background-color: var(--zoo-green, #4CAF50);
    color: white;
    text-decoration: none;
    border: 2px solid transparent;
    border-radius: 8px;
    transition: background-color 0.3s ease, transform 0.3s ease, border 0.3s ease;
    cursor: pointer;
    text-align: center;
}

.btn:hover {
    background-color: var(--zoo-dark-green, #388E3C);
    border: 2px solid var(--zoo-sun, #fdd835);
    transform: translateY(-3px);
}

.btn:active {
    background-color: var(--zoo-dark-green, #2e7d32);
    transform: translateY(0);
}

.btn:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(72, 180, 97, 0.5);
}
</style>
