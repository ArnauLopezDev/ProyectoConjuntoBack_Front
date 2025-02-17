<script setup>
import { onMounted } from 'vue';
const props = defineProps(["zoologico"]);
onMounted(async () => {
    console.log(props.zoologico);
})
</script>
<template>
    <div class="zoologico-card">
        <main>
            <section>
                <h2>{{ props.zoologico.name }}</h2>
                <p> {{ props.zoologico.description }}</p>
                <p>{{ props.zoologico.ubicacion }}</p>
                <br>
                <h2>Horarios</h2>
                <p>De las {{ props.zoologico.horario_apertura }} hasta las {{ props.zoologico.horario_cierre }} </p>
                <br>
                <h2>Mapa</h2>
                <iframe>{{ props.zoologico.mapa }}</iframe>
                <button class="btn btn-primary" @click="$router.push({
                    name: 'zoologicosIndiv', params: {
                        zoologicoid: props.zoologico.id_zoologico
                    }
                })">See
                    more</button>
            </section>
        </main>
    </div>
</template>
<style scoped>
.zoologico-card {
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    background-color: white;
    margin-bottom: 20px;
}

.zoologico-card:hover {
    transform: translateY(-10px);
}

.zoologico-card h2 {
    font-size: 24px;
    margin-bottom: 10px;
}

.zoologico-card p {
    font-size: 16px;
    line-height: 1.6;
}

.zoologico-card iframe {
    width: 100%;
    height: 250px;
    border: none;
    border-radius: 10px;
    margin-top: 10px;
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