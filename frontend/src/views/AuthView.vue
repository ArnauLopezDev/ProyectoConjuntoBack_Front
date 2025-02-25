<template>
    <div class="auth-container">
        <h1>{{ isLogin ? 'Login' : 'Sign Up' }}</h1>
        <form @submit.prevent="handleSubmit" class="auth-form">
            <div class="form-group" v-if="!isLogin">
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="form.name" required />
            </div>

            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="form.email" required />
            </div>

            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="form.password" required />
            </div>

            <button type="submit">{{ isLogin ? 'Login' : 'Sign Up' }}</button>
        </form>

        <button class="toggle-auth" @click="toggleAuth">
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
            const response = await api.post('/auth/login', {
                email: form.value.email,
                contrasena: form.value.password
            });
            localStorage.setItem('token', response.data.token);
            router.push('/');
        } else {
            // Sign-up request
            await api.post('/auth/register', {
                name: form.value.name,
                email: form.value.email,
                contrasena: form.value.password
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
    margin: 80px auto;
    padding: 40px;
    border-radius: 12px;
    background-color: #fff;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

    /* Center text in the container’s heading area */
    text-align: center;
}

.auth-container h1 {
    margin-bottom: 1rem;
    font-size: 2rem;
    color: #333;
}

/* Auth form styling */
.auth-form {
    display: flex;
    flex-direction: column;
    margin-top: 1.5rem;
    /* If you want the labels/inputs left-aligned, remove the line below:
       text-align: left;
    */
}

/* Group each label and input for cleaner spacing */
.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.2rem;
}

.form-group label {
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #555;
}

.form-group input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

.form-group input:focus {
    outline: none;
    border-color: #007bff;
}

/* Primary button (submit) */
.auth-form button[type="submit"] {
    width: 100%;
    margin-top: 1rem;
    padding: 0.75rem;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    background: #007bff;
    color: #fff;
    cursor: pointer;
    transition: background 0.3s ease;
}

.auth-form button[type="submit"]:hover {
    background: #0056b3;
}

/* The toggle button for switching forms */
.toggle-auth {
    margin-top: 1.5rem;
    background: transparent;
    border: none;
    color: #007bff;
    cursor: pointer;
    text-decoration: underline;
    font-size: 0.9rem;
}

.toggle-auth:hover {
    color: #0056b3;
}

/* Error message styling */
.error {
    margin-top: 1rem;
    color: #d9534f;
    text-align: center;
}
</style>