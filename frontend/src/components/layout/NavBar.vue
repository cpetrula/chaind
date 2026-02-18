<template>
  <header class="navbar">
    <div class="navbar-container">
      <!-- Logo -->
      <router-link to="/" class="navbar-logo">
        <span class="logo-text">CHAIND</span>
      </router-link>

      <!-- Desktop Navigation -->
      <nav class="navbar-menu" :class="{ 'is-active': menuOpen }">
        <router-link 
          v-for="link in navLinks" 
          :key="link.to" 
          :to="link.to" 
          class="navbar-link"
          @click="closeMenu"
        >
          {{ link.label }}
        </router-link>
        <router-link to="/book" class="navbar-cta" @click="closeMenu">
          Book an Event
        </router-link>
      </nav>

      <!-- Mobile Menu Toggle -->
      <button 
        class="navbar-burger" 
        :class="{ 'is-active': menuOpen }"
        @click="toggleMenu"
        aria-label="Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>

  <!-- Mobile menu overlay -->
  <div 
    v-if="menuOpen" 
    class="navbar-overlay" 
    @click="closeMenu"
  ></div>
</template>

<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/services', label: 'Services' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' }
]

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
  document.body.style.overflow = menuOpen.value ? 'hidden' : ''
}

const closeMenu = () => {
  menuOpen.value = false
  document.body.style.overflow = ''
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-logo {
  text-decoration: none;
}

.logo-text {
  font-size: 1.75rem;
  font-weight: 300;
  letter-spacing: 0.4em;
  color: #fff;
}

.navbar-menu {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.navbar-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: color 0.3s ease;
}

.navbar-link:hover,
.navbar-link.router-link-active {
  color: #fff;
}

.navbar-cta {
  background: #fff;
  color: #000;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.navbar-cta:hover {
  background: #c0c0c0;
}

.navbar-burger {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 24px;
  height: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.navbar-burger span {
  width: 100%;
  height: 2px;
  background: #fff;
  transition: all 0.3s ease;
  transform-origin: center;
}

.navbar-burger.is-active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.navbar-burger.is-active span:nth-child(2) {
  opacity: 0;
}

.navbar-burger.is-active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

.navbar-overlay {
  display: none;
}

/* Mobile styles */
@media (max-width: 968px) {
  .navbar-burger {
    display: flex;
    z-index: 1001;
  }

  .navbar-menu {
    position: fixed;
    top: 0;
    right: -100%;
    width: 80%;
    max-width: 300px;
    height: 100vh;
    background: #000;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    padding: 2rem;
    transition: right 0.3s ease;
  }

  .navbar-menu.is-active {
    right: 0;
  }

  .navbar-link {
    font-size: 1rem;
  }

  .navbar-cta {
    width: 100%;
    text-align: center;
  }

  .navbar-overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
}
</style>
