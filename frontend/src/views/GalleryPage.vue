<template>
  <div class="gallery-page">
    <!-- Hero -->
    <section class="page-hero">
      <div class="container">
        <h1 class="page-title">Gallery</h1>
        <p class="page-subtitle">Browse our collection of permanent jewelry and events</p>
      </div>
    </section>

    <!-- Filter Tabs -->
    <section class="filter-section">
      <div class="container">
        <div class="filter-tabs">
          <button 
            v-for="filter in filters" 
            :key="filter.value"
            class="filter-tab"
            :class="{ active: activeFilter === filter.value }"
            @click="activeFilter = filter.value"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- Gallery Grid -->
    <section class="section gallery-section">
      <div class="container">
        <div v-if="loading" class="loading-state">
          <ProgressSpinner />
        </div>

        <div v-else-if="filteredImages.length" class="gallery-grid">
          <div 
            v-for="(image, index) in filteredImages" 
            :key="image.id"
            class="gallery-item"
            @click="openLightbox(index)"
          >
            <img :src="image.image_url" :alt="image.title" loading="lazy" />
            <div class="gallery-overlay">
              <span class="gallery-title">{{ image.title }}</span>
              <span class="gallery-category">{{ formatCategory(image.category) }}</span>
            </div>
          </div>
        </div>

        <div v-else class="empty-state">
          <i class="pi pi-images"></i>
          <p>No images found in this category</p>
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <Dialog 
      v-model:visible="lightboxVisible" 
      :modal="true"
      :dismissableMask="true"
      :closable="true"
      :showHeader="false"
      class="lightbox-dialog"
      :pt="{
        root: { class: 'lightbox-root' },
        mask: { class: 'lightbox-mask' },
        content: { class: 'lightbox-content' }
      }"
    >
      <div class="lightbox-inner" v-if="currentImage">
        <button class="lightbox-close" @click="lightboxVisible = false">
          <i class="pi pi-times"></i>
        </button>
        
        <button class="lightbox-nav prev" @click="prevImage" v-if="filteredImages.length > 1">
          <i class="pi pi-chevron-left"></i>
        </button>
        
        <div class="lightbox-image">
          <img :src="currentImage.image_url" :alt="currentImage.title" />
        </div>
        
        <button class="lightbox-nav next" @click="nextImage" v-if="filteredImages.length > 1">
          <i class="pi pi-chevron-right"></i>
        </button>
        
        <div class="lightbox-info">
          <h3>{{ currentImage.title }}</h3>
          <p v-if="currentImage.description">{{ currentImage.description }}</p>
        </div>
      </div>
    </Dialog>

    <!-- CTA -->
    <section class="section cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Want This for Your Event?</h2>
          <p>We bring the permanent jewelry experience directly to you</p>
          <router-link to="/book" class="btn btn-primary btn-large">
            Book an Event
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useApi } from '@/composables/useApi'

const api = useApi()
const loading = ref(true)
const images = ref([])
const activeFilter = ref('all')
const lightboxVisible = ref(false)
const currentIndex = ref(0)

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Jewelry', value: 'jewelry' },
  { label: 'Events', value: 'events' },
  { label: 'Bridal', value: 'bridal' },
  { label: 'Corporate', value: 'corporate' },
  { label: 'Markets', value: 'markets' }
]

const filteredImages = computed(() => {
  if (activeFilter.value === 'all') {
    return images.value
  }
  return images.value.filter(img => img.category === activeFilter.value)
})

const currentImage = computed(() => {
  return filteredImages.value[currentIndex.value] || null
})

const formatCategory = (category) => {
  const labels = {
    jewelry: 'Jewelry',
    events: 'Events',
    bridal: 'Bridal',
    corporate: 'Corporate',
    markets: 'Markets'
  }
  return labels[category] || category
}

const openLightbox = (index) => {
  currentIndex.value = index
  lightboxVisible.value = true
}

const prevImage = () => {
  currentIndex.value = currentIndex.value > 0 
    ? currentIndex.value - 1 
    : filteredImages.value.length - 1
}

const nextImage = () => {
  currentIndex.value = currentIndex.value < filteredImages.value.length - 1 
    ? currentIndex.value + 1 
    : 0
}

onMounted(async () => {
  try {
    const data = await api.get('/gallery')
    images.value = data.gallery || []
  } catch (err) {
    // Use fallback images
    images.value = [
      { id: 1, title: 'Gold Chain Bracelet', category: 'jewelry', image_url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800' },
      { id: 2, title: 'Silver Anklet', category: 'jewelry', image_url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800' },
      { id: 3, title: 'Friendship Bracelets', category: 'jewelry', image_url: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800' },
      { id: 4, title: 'Market Event', category: 'markets', image_url: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800' },
      { id: 5, title: 'Bridal Party', category: 'bridal', image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800' },
      { id: 6, title: 'Corporate Team', category: 'corporate', image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800' },
      { id: 7, title: 'Delicate Gold Chain', category: 'jewelry', image_url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800' },
      { id: 8, title: 'Pop-up Setup', category: 'events', image_url: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800' }
    ]
  } finally {
    loading.value = false
  }
})

// Keyboard navigation for lightbox
const handleKeydown = (e) => {
  if (!lightboxVisible.value) return
  if (e.key === 'ArrowLeft') prevImage()
  if (e.key === 'ArrowRight') nextImage()
  if (e.key === 'Escape') lightboxVisible.value = false
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/* Page Hero */
.page-hero {
  padding: 6rem 0 4rem;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)),
    url('https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1920') center/cover;
  text-align: center;
}

.page-title {
  font-size: 3rem;
  font-weight: 200;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.page-subtitle {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.05em;
}

/* Filter Section */
.filter-section {
  padding: 2rem 0;
  background: #0a0a0a;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.filter-tabs {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.filter-tab {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.7);
  padding: 0.75rem 1.5rem;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-tab:hover {
  border-color: rgba(255, 255, 255, 0.5);
  color: #fff;
}

.filter-tab.active {
  background: #fff;
  color: #000;
  border-color: #fff;
}

/* Gallery Section */
.gallery-section {
  background: #0a0a0a;
  padding-top: 3rem;
}

.loading-state {
  display: flex;
  justify-content: center;
  padding: 4rem 0;
}

.empty-state {
  text-align: center;
  padding: 4rem 0;
  color: rgba(255, 255, 255, 0.5);
}

.empty-state i {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.gallery-item {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  cursor: pointer;
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
  background: linear-gradient(transparent 40%, rgba(0, 0, 0, 0.9));
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery-item:hover .gallery-overlay {
  opacity: 1;
}

.gallery-title {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.gallery-category {
  font-size: 0.75rem;
  color: #c0c0c0;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* Lightbox */
:deep(.lightbox-root) {
  max-width: 95vw;
  max-height: 95vh;
}

:deep(.lightbox-mask) {
  background: rgba(0, 0, 0, 0.95);
}

:deep(.lightbox-content) {
  background: transparent;
  padding: 0;
  border: none;
}

.lightbox-inner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 90vh;
}

.lightbox-close {
  position: absolute;
  top: -2rem;
  right: -1rem;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
  padding: 0.5rem;
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: #fff;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease;
  border-radius: 50%;
}

.lightbox-nav:hover {
  background: rgba(255, 255, 255, 0.2);
}

.lightbox-nav.prev {
  left: -4rem;
}

.lightbox-nav.next {
  right: -4rem;
}

.lightbox-image {
  max-width: 80vw;
  max-height: 70vh;
}

.lightbox-image img {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
}

.lightbox-info {
  text-align: center;
  padding: 1.5rem;
}

.lightbox-info h3 {
  font-size: 1.25rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
}

.lightbox-info p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

/* CTA Section */
.cta-section {
  text-align: center;
}

.cta-content h2 {
  font-size: 2.5rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
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

.btn-large {
  padding: 1.25rem 2.5rem;
  font-size: 1rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .gallery-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .lightbox-nav.prev {
    left: 1rem;
  }

  .lightbox-nav.next {
    right: 1rem;
  }
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .filter-tab {
    padding: 0.5rem 1rem;
    font-size: 0.7rem;
  }

  .cta-content h2 {
    font-size: 1.75rem;
  }
}

@media (max-width: 480px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }
}
</style>
