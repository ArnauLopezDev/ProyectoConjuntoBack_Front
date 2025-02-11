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
                <br>
                <h2>Horarios</h2>
                <p>{{ props.zoologico.horarios }}</p>
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