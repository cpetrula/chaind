<template>
  <div class="events-page">
    <!-- Hero -->
    <section class="page-hero">
      <div class="container">
        <h1 class="page-title">Events Calendar</h1>
        <p class="page-subtitle">Find us at upcoming markets, pop-ups, and special events</p>
      </div>
    </section>

    <!-- Events List -->
    <section class="section events-section">
      <div class="container">
        <div v-if="loading" class="loading-state">
          <ProgressSpinner />
        </div>

        <div v-else-if="events.length" class="events-list">
          <div 
            v-for="event in events" 
            :key="event.id"
            class="event-card"
          >
            <!-- Event Image -->
            <div class="event-image" v-if="event.image_url">
              <img :src="event.image_url" :alt="event.name" loading="lazy" />
            </div>
            <div class="event-image placeholder" v-else>
              <i class="pi pi-calendar"></i>
            </div>

            <!-- Event Details -->
            <div class="event-content">
              <div class="event-date-badge">
                <span class="date-month">{{ formatMonth(event.event_date) }}</span>
                <span class="date-day">{{ formatDay(event.event_date) }}</span>
              </div>

              <div class="event-info">
                <h3 class="event-title">{{ event.name }}</h3>
                
                <div class="event-meta">
                  <!-- Time -->
                  <div class="meta-item">
                    <i class="pi pi-clock"></i>
                    <span>{{ formatTime(event.start_time) }} - {{ formatTime(event.end_time) }}</span>
                  </div>

                  <!-- Location -->
                  <div class="meta-item" v-if="event.location_name || event.city">
                    <i class="pi pi-map-marker"></i>
                    <span>
                      <span v-if="event.location_name">{{ event.location_name }}<br /></span>
                      <span v-if="event.street_address">{{ event.street_address }}<br /></span>
                      <span v-if="event.city">{{ event.city }}, {{ event.state }} {{ event.zip_code }}</span>
                    </span>
                  </div>
                </div>

                <p class="event-description" v-if="event.description">
                  {{ event.description }}
                </p>

                <!-- Map Link -->
                <a 
                  v-if="event.map_link" 
                  :href="event.map_link" 
                  target="_blank"
                  rel="noopener noreferrer"
                  class="map-link"
                >
                  <i class="pi pi-directions"></i>
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="empty-state">
          <i class="pi pi-calendar-times"></i>
          <h3>No Upcoming Events</h3>
          <p>Check back soon for new events!</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '@/composables/useApi'
import ProgressSpinner from 'primevue/progressspinner'

const api = useApi()
const events = ref([])
const loading = ref(true)

const fetchEvents = async () => {
  try {
    loading.value = true
    const response = await api.get('/events')
    events.value = response.events
  } catch (error) {
    console.error('Failed to fetch events:', error)
  } finally {
    loading.value = false
  }
}

const formatMonth = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
}

const formatDay = (dateString) => {
  const date = new Date(dateString)
  return date.getDate()
}

const formatTime = (timeString) => {
  if (!timeString) return ''
  const [hours, minutes] = timeString.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${ampm}`
}

onMounted(() => {
  fetchEvents()
})
</script>

<style scoped>
.events-page {
  min-height: 100vh;
  background: var(--surface-ground);
}

.page-hero {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-600) 100%);
  color: white;
  padding: 4rem 0 3rem;
  text-align: center;
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 1rem;
}

.page-subtitle {
  font-size: 1.25rem;
  opacity: 0.95;
  max-width: 600px;
  margin: 0 auto;
}

.section {
  padding: 3rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.loading-state,
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-state i {
  font-size: 4rem;
  color: #9ca3af;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.5rem;
  margin: 1rem 0 0.5rem;
  color: #1a1a1a;
}

.empty-state p {
  color: #6b7280;
}

/* Events List */
.events-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.event-card {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.event-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.event-image {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--surface-100);
}

.event-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.event-image.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-50) 0%, var(--primary-100) 100%);
}

.event-image.placeholder i {
  font-size: 4rem;
  color: var(--primary-color);
  opacity: 0.5;
}

.event-content {
  padding: 2rem;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.5rem;
}

.event-date-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-600) 100%);
  color: white;
  border-radius: 8px;
  flex-shrink: 0;
}

.date-month {
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.date-day {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
}

.event-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.event-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  color: #1a1a1a;
}

.event-meta {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.meta-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: #4a5568;
  font-size: 1rem;
}

.meta-item i {
  margin-top: 0.25rem;
  color: var(--primary-color);
}

.event-description {
  color: #4a5568;
  line-height: 1.6;
  margin: 0;
}

.map-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--primary-color);
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.map-link:hover {
  color: var(--primary-600);
  gap: 0.75rem;
}

.map-link i {
  font-size: 1.1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .page-subtitle {
    font-size: 1rem;
  }

  .event-card {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .event-image {
    height: 250px;
  }

  .event-content {
    padding: 1.5rem;
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .event-date-badge {
    width: 70px;
    height: 70px;
  }

  .date-month {
    font-size: 0.75rem;
  }

  .date-day {
    font-size: 1.75rem;
  }

  .event-title {
    font-size: 1.5rem;
  }
}
</style>
