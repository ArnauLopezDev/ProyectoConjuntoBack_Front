<!-- src/views/AuthView.vue -->
<template>
    <div class="auth-container">
        <h1>{{ isLogin ? 'Login' : 'Sign Up' }}</h1>
        <form @submit.prevent="handleSubmit">
            <div v-if="!isLogin">
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="form.name" required />
            </div>
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="form.email" required />

            <label for="password">Password:</label>
            <input type="password" id="password" v-model="form.password" required />

            <button type="submit">{{ isLogin ? 'Login' : 'Sign Up' }}</button>
        </form>
        <button @click="toggleAuth">
            {{ isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login" }}
        </button>
        <p v-if="error" class="error">{{ error }}</p>
    </div>
</template>

<script setup>
import api from '@/services/api';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isLogin = ref(true);
const form = ref({
    name: '',
    email: '',
    password: ''
});
const error = ref('');
const router = useRouter();

const handleSubmit = async () => {
    error.value = '';
    try {
        if (isLogin.value) {
            // Login request
            const response = await api.post('auth/login', {
                email: form.value.email,
                contrasena: form.value.password
            });
            // Save token (for example, in localStorage)
            localStorage.setItem('token', response.data.token);
            router.push('/'); // Redirect after login
        } else {
            // Sign-up request
            await api.post('/auth/register', {
                name: form.value.name,
                email: form.value.email,
                contrasena: form.value.password,
                // rol is optional and will default to 'visitante'
            });
            isLogin.value = true;
            error.value = 'Registration successful. Please log in.';
        }
    } catch (err) {
        error.value = err.response?.data?.error || err.message;
    }
};

const toggleAuth = () => {
    isLogin.value = !isLogin.value;
    error.value = '';
};
</script>

<style scoped>
.auth-container {
    max-width: 400px;
    margin: 40px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
}

label {
    display: block;
    margin-top: 10px;
}

input {
    width: 100%;
    padding: 8px;
    margin-top: 4px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    margin-top: 20px;
    padding: 10px 15px;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.error {
    color: red;
    margin-top: 10px;
}
</style>