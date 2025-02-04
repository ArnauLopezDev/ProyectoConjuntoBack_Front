<!-- src/views/AnimalsListView.vue -->
<template>
    <div class="page-container">
        <AnimalsList />
    </div>
</template>

<script setup>
import AnimalsList from '../components/AnimalsList.vue';
</script>

<style>
.page-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}
</style>