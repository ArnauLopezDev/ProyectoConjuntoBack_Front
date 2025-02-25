<template>
    <div class="admin-panel">
        <h2>Panel de Administración</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Especie</th>
                    <th>Visible</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="animal in animals" :key="animal.id_animal">
                    <td>{{ animal.id_animal }}</td>
                    <td>{{ animal.name }}</td>
                    <td>{{ animal.species }}</td>
                    <td>
                        <input type="checkbox" :checked="animal.visible" @change="toggleVisibility(animal)" />
                    </td>

                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import api from '@/services/api';

export default {
    name: "AdminPanel",
    data() {
        return {
            animals: [],
        };
    },
    created() {
        this.fetchAnimals();
    },
    methods: {
        async fetchAnimals() {
            try {
                const response = await api.get('/animals');
                this.animals = response.data;
            } catch (error) {
                console.error("Error al obtener animales:", error);
            }
        },
        async toggleVisibility(animal) {
            const newVisibility = !animal.visible;
            try {
                await api.put(
                    `/animals/${animal.id_animal}/visibility`,
                    { visible: newVisibility },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );
                animal.visible = newVisibility;
            } catch (error) {
                console.error("Error al actualizar visibilidad:", error);
            }
        },
    },
};
</script>

<style scoped>
.admin-panel {
    padding: 2rem;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
}

th,
td {
    border: 1px solid #ccc;
    padding: 0.5rem;
    text-align: left;
}

th {
    background-color: #f4f4f4;
}
</style>