<template>
    <div>
        <h2>Animals</h2>
        <div v-if="animals.length === 0">
            <p>Loading...</p>
        </div>
        <ul v-else>
            <li v-for="animal in animals" :key="animal.id">
                {{ animal.name }}
            </li>
        </ul>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            animals: [],
        };
    },
    mounted() {
        axios.get('http://localhost:3000/api/animals')
            .then(response => {
                this.animals = response.data;
            })
            .catch(error => {
                console.error(error);
            });
    },
};
</script>