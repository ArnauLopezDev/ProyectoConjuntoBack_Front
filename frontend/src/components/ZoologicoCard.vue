<script setup>
import { onMounted } from 'vue';

const props = defineProps(["zoologico"]);

onMounted(() => {
    console.log(props.zoologico);
});
</script>

<template>
    <div class="zoologico-card">
        <main>
            <section>
                <h2>{{ props.zoologico.name }}</h2>
                <p>{{ props.zoologico.description }}</p>
                <p><strong>Ubicación:</strong> {{ props.zoologico.ubicacion }}</p>

                <div class="horarios">
                    <h3>Horarios</h3>
                    <p>De {{ props.zoologico.horario_apertura }} hasta {{ props.zoologico.horario_cierre }}</p>
                </div>

                <div class="mapa">
                    <h3>Mapa</h3>
                    <iframe :src="props.zoologico.mapa" loading="lazy"></iframe>
                </div>

                <button class="btn"
                    @click="$router.push({ name: 'zoologicosIndiv', params: { zoologicoid: props.zoologico.id_zoologico } })">
                    Ver más
                </button>
            </section>
        </main>
    </div>
</template>

<style scoped>
.zoologico-card {
    max-width: 500px;
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    background-color: #fff;
    margin: 20px auto;
}

.zoologico-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.zoologico-card h2 {
    font-size: 22px;
    margin-bottom: 8px;
    color: #333;
}

.zoologico-card h3 {
    font-size: 18px;
    margin-top: 15px;
    color: #555;
}

.zoologico-card p {
    font-size: 16px;
    line-height: 1.5;
    color: #666;
    margin-bottom: 8px;
}

.horarios,
.mapa {
    margin-top: 15px;
}

.mapa iframe {
    width: 100%;
    height: 200px;
    border: none;
    border-radius: 8px;
    margin-top: 8px;
}

.btn {
    display: block;
    width: 100%;
    padding: 12px;
    margin-top: 20px;
    background-color: #4CAF50;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 6px;
    transition: background 0.3s ease, transform 0.2s ease;
    cursor: pointer;
    text-align: center;
}

.btn:hover {
    background-color: #43a047;
    transform: translateY(-2px);
}

.btn:active {
    background-color: #388e3c;
    transform: translateY(0);
}

.btn:focus {
    outline: none;
    box-shadow: 0 0 4px rgba(76, 175, 80, 0.6);
}
</style>
