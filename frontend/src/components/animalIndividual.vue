<template>
    <div>
        <h2></h2>
    </div>
</template>
<script>
// In your Vue component
import axios from 'axios';

export default {
    data() {
        return {
            animals: []
        }
    },
    mounted() {
        axios.get('http://localhost:3000/api/animals')
            .then(response => {
                this.animals = response.data;
            })
            .catch(error => {
                console.error(error);
            });
    }
}

</script>