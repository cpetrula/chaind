<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Main Footer Content -->
      <div class="footer-grid">
        <!-- Brand -->
        <div class="footer-brand">
          <img src="@/assets/images/logo.png" alt="Chaind" class="footer-logo-img" />
          <p class="footer-tagline">
            Creating lasting connections through permanent jewelry.
            One link at a time.
          </p>
          <div class="footer-social">
            <a href="#" class="social-link" aria-label="Instagram" title="Instagram">
              <i class="pi pi-instagram"></i>
            </a>
            <a href="#" class="social-link" aria-label="Facebook" title="Facebook">
              <i class="pi pi-facebook"></i>
            </a>
            <a href="#" class="social-link" aria-label="TikTok" title="TikTok">
              <i class="pi pi-play"></i>
            </a>
            <a href="#" class="social-link" aria-label="Pinterest" title="Pinterest">
              <i class="pi pi-pinterest"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/about">About Us</router-link></li>
            <li><router-link to="/gallery">Gallery</router-link></li>
            <li><router-link to="/services">Services</router-link></li>
          </ul>
        </div>

        <!-- Services -->
        <div class="footer-links">
          <h4>Services</h4>
          <ul>
            <li><router-link to="/services">Private Parties</router-link></li>
            <li><router-link to="/services">Corporate Events</router-link></li>
            <li><router-link to="/services">Bridal Events</router-link></li>
            <li><router-link to="/services">Markets & Pop-ups</router-link></li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="footer-contact">
          <h4>Contact</h4>
          <ul>
            <li>
              <i class="pi pi-envelope"></i>
              <a href="mailto:hello@chaind.com">hello@chaind.com</a>
            </li>
            <li>
              <i class="pi pi-phone"></i>
              <a href="tel:+15551234567">(555) 123-4567</a>
            </li>
            <li>
              <i class="pi pi-map-marker"></i>
              <span>Los Angeles, CA</span>
            </li>
          </ul>
          <router-link to="/book" class="footer-cta">
            Book an Event
          </router-link>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} CHAIND. All rights reserved.</p>
        <div class="footer-legal">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  background: #000;
  color: rgba(255, 255, 255, 0.8);
  padding: 4rem 2rem 2rem;
  margin-top: auto;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-logo-img {
  height: 36px;
  width: auto;
  margin-bottom: 1rem;
}

.footer-tagline {
  font-size: 0.875rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  max-width: 280px;
}

.footer-social {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  color: #fff;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #fff;
  color: #000;
  border-color: #fff;
}

.footer-links h4,
.footer-contact h4 {
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 1.5rem;
}

.footer-links ul,
.footer-contact ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.75rem;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #fff;
}

.footer-contact li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.footer-contact i {
  font-size: 1rem;
  color: #c0c0c0;
}

.footer-contact a,
.footer-contact span {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.3s ease;
}

.footer-contact a:hover {
  color: #fff;
}

.footer-cta {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: #fff;
  color: #000;
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

.footer-cta:hover {
  background: #c0c0c0;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  font-size: 0.75rem;
}

.footer-bottom p {
  color: rgba(255, 255, 255, 0.5);
}

.footer-legal {
  display: flex;
  gap: 2rem;
}

.footer-legal a {
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-legal a:hover {
  color: #fff;
}

/* Responsive */
@media (max-width: 968px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }

  .footer-brand {
    grid-column: span 2;
  }
}

@media (max-width: 576px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }

  .footer-brand {
    grid-column: span 1;
    text-align: center;
  }

  .footer-tagline {
    max-width: none;
  }

  .footer-social {
    justify-content: center;
  }

  .footer-links,
  .footer-contact {
    text-align: center;
  }

  .footer-contact li {
    justify-content: center;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>
