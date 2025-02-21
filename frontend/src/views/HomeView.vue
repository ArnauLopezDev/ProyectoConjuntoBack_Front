<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>Welcome to Catalonia Zoologics</h1>
        <p>
          Discover our unique zoologicos and explore the diverse animal world.
        </p>
        <router-link to="/zoologicos" class="cta-btn">
          Explore Zoologicos
        </router-link>
      </div>
    </section>

    <!-- Featured Zoologicos Section -->
    <section class="featured-section zoologicos">
      <h2>Featured Zoologicos</h2>
      <p>
        Check out our curated list of zoologicos, each offering unique
        exhibits and interactive experiences.
      </p>
      <router-link to="/zoologicos" class="view-all-btn">
        View All Zoologicos
      </router-link>
    </section>

    <!-- Featured Animals Section -->
    <section class="featured-section animals">
      <h2>Featured Animals</h2>
      <p>
        Dive into the animal kingdom and learn about fascinating species from
        around the world.
      </p>
      <router-link to="/animals" class="view-all-btn">
        View All Animals
      </router-link>
    </section>

    <!-- Call-to-Action for Authentication -->
    <section class="auth-cta">
      <p>
        Join our community for the latest updates, exclusive content, and more!
      </p>
      <router-link to="/auth" class="auth-btn">
        Login / Sign Up
      </router-link>
    </section>

    <!-- Footer -->
    <footer class="home-footer">
      <p>&copy; 2025 Zoologic Project. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
// This Home view is static for now.
// Add any dynamic features (e.g., fetching featured items) as needed.
</script>

<style scoped>
/* Global Home Styles */
.home {
  font-family: Arial, sans-serif;
  background: var(--zoo-sand);
  color: var(--zoo-brown);
  display: flex;
  flex-direction: column;
  align-items: center;

}

/* Hero Section */
.hero {
  position: relative;
  width: 100%;
  height: 70vh;
  background: url('/path/to/hero-image.jpg') center center / cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--zoo-green);

}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
}

.hero-content {
  position: relative;
  text-align: center;
  z-index: 1;
  max-width: 800px;
  padding: 0 20px;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero-content p {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.cta-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--zoo-sun);
  color: var(--zoo-brown);
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  transition: background 0.3s ease;
}

.cta-btn:hover {
  background: #e5c033;
}

/* Featured Sections */
.featured-section {
  width: 100%;
  max-width: 1400px;
  padding: 3rem 20px;
  text-align: center;
  margin-top: 2rem;
}

.featured-section h2 {
  font-family: 'WildWest', cursive;
  color: var(--zoo-green);
  font-size: 2.5rem;
  margin-bottom: 1rem;
  position: relative;
  padding-bottom: 0.5rem;
}

.featured-section h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 3px;
  background: var(--zoo-sun);
}

.featured-section p {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: var(--zoo-brown);
}

.view-all-btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: var(--zoo-sun);
  color: var(--zoo-brown);
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.3s ease;
}

.view-all-btn:hover {
  background: #e5c033;
}

/* Auth CTA Section */
.auth-cta {
  width: 100%;
  max-width: 1400px;
  padding: 2rem 20px;
  text-align: center;
  background: #fff;
  margin-top: 2rem;
  border-top: 1px solid #ddd;
}

.auth-cta p {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: var(--zoo-brown);
}

.auth-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--zoo-green);
  color: #fff;
  text-decoration: none;
  border-radius: 8px;
  transition: background 0.3s ease;
}

.auth-btn:hover {
  background: #005b3a;
}

/* Footer */
.home-footer {
  width: 100%;
  background: #fff;
  border-top: 1px solid #ddd;
  text-align: center;
  padding: 1rem 0;
  margin-top: 2rem;
  font-size: 0.9rem;
  color: #777;
}
</style>
