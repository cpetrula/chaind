<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          Forever Linked
        </h1>
        <p class="hero-subtitle">
          Permanent jewelry for life's most meaningful moments
        </p>
        <div class="hero-cta">
          <router-link to="/book" class="btn btn-primary">Book an Event</router-link>
          <router-link to="/gallery" class="btn btn-secondary">View Gallery</router-link>
        </div>
      </div>
      <div class="hero-scroll">
        <span>Scroll to explore</span>
        <i class="pi pi-chevron-down"></i>
      </div>
    </section>

    <!-- What Is Section -->
    <section class="section what-is">
      <div class="container">
        <div class="what-is-content">
          <div class="what-is-text">
            <h2 class="section-title text-left">What is Permanent Jewelry?</h2>
            <p>
              Permanent jewelry is a seamless, clasp-free piece that's custom-fitted 
              and welded directly onto you. Using a quick, painless micro-weld, we 
              create a bond as lasting as the connections it represents.
            </p>
            <p>
              Whether it's a friendship bracelet, anniversary gift, or bridal party 
              favor, permanent jewelry transforms a simple chain into a meaningful 
              symbol of your most treasured relationships.
            </p>
            <ul class="feature-list">
              <li>
                <i class="pi pi-check-circle"></i>
                <span>Quick & painless application (under 5 minutes)</span>
              </li>
              <li>
                <i class="pi pi-check-circle"></i>
                <span>14k gold-filled & sterling silver options</span>
              </li>
              <li>
                <i class="pi pi-check-circle"></i>
                <span>Waterproof — shower, swim, live your life</span>
              </li>
              <li>
                <i class="pi pi-check-circle"></i>
                <span>Perfect for any occasion</span>
              </li>
            </ul>
          </div>
          <div class="what-is-image">
            <img 
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600" 
              alt="Permanent bracelet closeup"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Gallery -->
    <section class="section featured-gallery">
      <div class="container">
        <h2 class="section-title">Our Work</h2>
        <p class="section-subtitle">
          Every piece tells a story. Browse our collection of custom permanent jewelry.
        </p>
        
        <div class="gallery-grid" v-if="featuredImages.length">
          <div 
            v-for="(image, index) in featuredImages" 
            :key="image.id"
            class="gallery-item"
            :class="{ 'large': index === 0 }"
          >
            <img :src="image.image_url" :alt="image.title" />
            <div class="gallery-overlay">
              <span>{{ image.title }}</span>
            </div>
          </div>
        </div>

        <div class="gallery-cta">
          <router-link to="/gallery" class="btn btn-secondary">
            View Full Gallery
            <i class="pi pi-arrow-right"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Services Preview -->
    <section class="section services-preview">
      <div class="container">
        <h2 class="section-title">We Bring the Sparkle to You</h2>
        <p class="section-subtitle">
          From intimate gatherings to large-scale events, we create unforgettable 
          experiences wherever you are.
        </p>

        <div class="services-grid">
          <div class="service-card">
            <div class="service-icon">
              <i class="pi pi-users"></i>
            </div>
            <h3>Private Parties</h3>
            <p>Birthdays, bachelorettes, girls' night — we bring the permanent jewelry 
              experience to your celebration.</p>
          </div>

          <div class="service-card">
            <div class="service-icon">
              <i class="pi pi-building"></i>
            </div>
            <h3>Corporate Events</h3>
            <p>Team building with a twist. Give your employees a unique, memorable 
              bonding experience.</p>
          </div>

          <div class="service-card">
            <div class="service-icon">
              <i class="pi pi-heart"></i>
            </div>
            <h3>Bridal Events</h3>
            <p>Matching bracelets for your bridal party. A beautiful keepsake 
              they'll wear forever.</p>
          </div>

          <div class="service-card">
            <div class="service-icon">
              <i class="pi pi-shop"></i>
            </div>
            <h3>Markets & Pop-ups</h3>
            <p>Find us at local markets, festivals, and pop-up events throughout 
              the Los Angeles area.</p>
          </div>
        </div>

        <div class="services-cta">
          <router-link to="/services" class="btn btn-primary">
            Explore Services
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Ready to Create Something Lasting?</h2>
          <p>
            Whether it's your first piece or your tenth, we'd love to help you 
            celebrate your special moments.
          </p>
          <div class="cta-buttons">
            <router-link to="/book" class="btn btn-primary btn-large">
              Book Your Event
            </router-link>
            <router-link to="/contact" class="btn btn-secondary btn-large">
              Get in Touch
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '@/composables/useApi'

const api = useApi()
const featuredImages = ref([])

onMounted(async () => {
  try {
    const data = await api.get('/gallery?featured=true&limit=4')
    featuredImages.value = data.gallery?.slice(0, 4) || []
  } catch (err) {
    // Use fallback images if API fails
    featuredImages.value = [
      { id: 1, title: 'Gold Chain Bracelet', image_url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800' },
      { id: 2, title: 'Silver Anklet', image_url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800' },
      { id: 3, title: 'Friendship Bracelets', image_url: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800' },
      { id: 4, title: 'Bridal Party', image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800' }
    ]
  }
})
</script>

<style scoped>
/* Hero Section */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)),
    url('https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1920') center/cover;
  margin-top: -80px;
  padding-top: 80px;
  position: relative;
}

.hero-content {
  max-width: 800px;
  padding: 2rem;
}

.hero-title {
  font-size: 4rem;
  font-weight: 200;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 300;
  margin-bottom: 3rem;
  letter-spacing: 0.05em;
}

.hero-cta {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-scroll {
  position: absolute;
  bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(10px); }
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #fff;
  color: #000;
}

.btn-primary:hover {
  background: #c0c0c0;
}

.btn-secondary {
  background: transparent;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #fff;
}

.btn-large {
  padding: 1.25rem 2.5rem;
  font-size: 1rem;
}

/* What Is Section */
.what-is-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.what-is-text {
  padding-right: 2rem;
}

.text-left {
  text-align: left;
}

.what-is-text p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  line-height: 1.8;
}

.feature-list {
  list-style: none;
  margin-top: 2rem;
}

.feature-list li {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.9);
}

.feature-list i {
  color: #c0c0c0;
  font-size: 1.25rem;
}

.what-is-image img {
  width: 100%;
  height: 500px;
  object-fit: cover;
}

/* Featured Gallery */
.featured-gallery {
  background: #0a0a0a;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.gallery-item {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1;
}

.gallery-item.large {
  grid-column: span 2;
  grid-row: span 2;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery-item:hover img {
  transform: scale(1.1);
}

.gallery-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(transparent 50%, rgba(0, 0, 0, 0.8));
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

.gallery-overlay span {
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.05em;
}

.gallery-cta {
  text-align: center;
  margin-top: 3rem;
}

/* Services Preview */
.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.service-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2.5rem 2rem;
  text-align: center;
  transition: all 0.3s ease;
}

.service-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-5px);
}

.service-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #c0c0c0;
  border-radius: 50%;
}

.service-icon i {
  font-size: 1.5rem;
  color: #c0c0c0;
}

.service-card h3 {
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
}

.service-card p {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.7;
}

.services-cta {
  text-align: center;
  margin-top: 3rem;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)),
    url('https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1920') center/cover;
}

.cta-content {
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}

.cta-content h2 {
  font-size: 2.5rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
}

.cta-content p {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2.5rem;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-title {
    font-size: 3rem;
  }

  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .gallery-item.large {
    grid-column: span 2;
    grid-row: span 1;
    aspect-ratio: 2/1;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.25rem;
    letter-spacing: 0.15em;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .what-is-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .what-is-text {
    padding-right: 0;
    order: 2;
  }

  .what-is-image {
    order: 1;
  }

  .what-is-image img {
    height: 300px;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .gallery-item.large {
    grid-column: span 1;
    aspect-ratio: 1;
  }

  .cta-content h2 {
    font-size: 1.75rem;
  }

  .btn {
    padding: 0.875rem 1.5rem;
    font-size: 0.8rem;
  }
}
</style>
