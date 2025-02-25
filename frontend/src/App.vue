<template>
  <header>
    <RouterLink to="/">
      <img alt="Zoo logo" class="logo" src="@/assets/logo.png" width="125" height="125" />
    </RouterLink>
    <img alt="Zoo logo" class="logo" src="@/assets/logo.png" width="125" height="125" />
    <div class="wrapper">
      <nav>
        <RouterLink to="/animales">Animales</RouterLink>
        <RouterLink to="/zoologicos">Zoológicos</RouterLink>
        <RouterLink to="/auth">Login/Registro</RouterLink>
        <RouterLink v-if="isAdmin" to="/admin">Admin Panel</RouterLink>
      </nav>
    </div>
  </header>

  <main class="main-content">
    <RouterView />
  </main>
</template>

<script>
import * as jwtDecode from "jwt-decode";

export default {
  name: "App",
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem("token");
    },
    isAdmin() {
      const token = localStorage.getItem("token");
      if (!token) return false;
      try {
        const decoded = jwtDecode.default(token);

        return decoded.rol === "admin";
      } catch (error) {
        console.error("Error decoding token:", error);
        return false;
      }
    },
  },
};
</script>

<style scoped>
:root {
  --header-height: 120px;
  --header-pattern-height: 20px;
}

header {
  height: var(--header-height);
  background: var(--zoo-green);
  padding: 0.5rem 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  border-bottom: 3px solid var(--zoo-brown);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.logo {
  max-height: 80px;
  max-width: 80px;
  border-radius: 50%;
  border: 3px solid var(--zoo-sun);
  padding: 4px;
  background: var(--zoo-sand);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.logo:hover {
  transform: rotate(15deg) scale(1.1);
  box-shadow: 0 0 20px rgba(245, 166, 35, 0.4);
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
}

nav {
  display: flex;
  gap: 1.5rem;
  position: relative;
  padding-right: 1rem;
}

nav::after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 60%;
  width: 3px;
  background: linear-gradient(to bottom, transparent);

}

nav a {
  font-family: 'WildWest', cursive;
  color: var(--zoo-sand);
  text-decoration: none;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

nav a:hover {
  color: var(--zoo-green);
  background: var(--zoo-sun);
  transform: translateY(-2px);
}

nav a.router-link-active {
  background: var(--zoo-brown);
  color: var(--zoo-sand);
  box-shadow: inset 0 4px 12px rgba(0, 0, 0, 0.2);
}

.main-content {
  padding-top: calc(var(--header-height) + var(--header-pattern-height) + 20px);
  min-height: 100vh;
  background-image:
    linear-gradient(to bottom, var(--zoo-sky), var(--zoo-sand) 60%),
    url('data:image/svg+xml,<svg ...>/* subtle paw pattern */</svg>');
  background-blend-mode: soft-light;
  margin: 0 auto;
  margin-top: 5rem;

}

header::after {
  content: '';
  position: absolute;
  bottom: calc(-1 * var(--header-pattern-height));
  left: 0;
  width: 100%;
  height: var(--header-pattern-height);
  background-image: url('data:image/svg+xml,<svg ...>/* animal track pattern */</svg>');
  background-repeat: repeat-x;
  opacity: 0.8;
}

@media (min-width: 1024px) {
  :root {
    --header-height: 140px;
  }

  header {
    padding: 0 4rem;
  }

  .logo {
    max-height: 100px;
    max-width: 100px;
  }

  .wrapper {
    flex-direction: row;
    align-items: center;
    gap: 3rem;
  }

  nav {
    gap: 2.5rem;
    padding-right: 0;
  }

  nav a {
    font-size: 1.25rem;
    padding: 1rem 1.75rem;
  }
}

@media (max-width: 768px) {
  header {
    padding: 0 1rem;
    flex-direction: column;
    height: auto;
    padding: 1rem;
  }

  .logo {
    max-height: 60px;
    margin-bottom: 1rem;
  }

  .wrapper {
    width: 100%;
    align-items: center;
  }

  nav {
    flex-wrap: wrap;
    justify-content: center;
    padding-right: 0;
    gap: 1rem;
  }

  nav::after {
    display: none;
  }

  .main-content {
    padding-top: 180px;
  }

}

@keyframes header-scroll {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-100%);
  }
}
</style>
