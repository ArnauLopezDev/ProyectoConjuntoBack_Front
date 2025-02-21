<template>
    <div class="home">
        <!-- Hero Section -->
        <section class="hero">
            <!-- Overlay to slightly dim the background -->
            <div class="hero-overlay"></div>
            <div class="hero-content">
                <h1>Welcome to Zoologic Project</h1>
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
</script>

<style scoped>
/* Overall Page Styles */
.home {
    background: #000;
    /* or #121212 for a slightly lighter black */
    color: #ccc;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    font-family: Arial, sans-serif;
}

/* Hero Section */
.hero {
    position: relative;
    width: 100%;
    height: 60vh;
    background: url('/path/to/hero-image.jpg') center center / cover no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

/* Slight overlay to darken the hero image */
.hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
}

.hero-content {
    position: relative;
    text-align: center;
    z-index: 1;
    max-width: 800px;
    padding: 0 20px;
}

.hero-content h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #fff;
}

.hero-content p {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
    color: #ccc;
}

/* Call-to-Action button in the hero */
.cta-btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background: #ffcc00;
    /* accent color that pops on black */
    color: #000;
    text-decoration: none;
    border-radius: 8px;
    font-weight: bold;
    transition: background 0.3s ease;
}

.cta-btn:hover {
    background: #e6b800;
}

/* Shared Featured Section Styles */
.featured-section {
    width: 100%;
    max-width: 1400px;
    padding: 3rem 20px;
    text-align: center;
}

.featured-section h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #fff;
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
    background: #ffcc00;
}

.featured-section p {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    color: #ccc;
}

/* "View All" Buttons */
.view-all-btn {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: #ffcc00;
    color: #000;
    text-decoration: none;
    border-radius: 6px;
    transition: background 0.3s ease;
}

.view-all-btn:hover {
    background: #e6b800;
}

/* Auth CTA Section */
.auth-cta {
    width: 100%;
    max-width: 1400px;
    padding: 2rem 20px;
    text-align: center;
    margin-top: 2rem;
    background: #111;
    /* darker section to separate from the rest */
}

.auth-cta p {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #ccc;
}

.auth-btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background: #444;
    /* subtle dark grey button */
    color: #fff;
    text-decoration: none;
    border-radius: 8px;
    transition: background 0.3s ease;
}

.auth-btn:hover {
    background: #666;
}

/* Footer */
.home-footer {
    width: 100%;
    background: #111;
    text-align: center;
    padding: 1rem 0;
    margin-top: auto;
    /* push footer to bottom if content is short */
    font-size: 0.9rem;
    color: #555;
    border-top: 1px solid #333;
}
</style>
