<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <aside class="admin-sidebar">
      <div class="sidebar-header">
        <router-link to="/" class="logo">CHAIND</router-link>
        <span class="admin-badge">Admin</span>
      </div>

      <nav class="sidebar-nav">
        <router-link to="/admin" class="nav-item" exact-active-class="active">
          <i class="pi pi-home"></i>
          <span>Dashboard</span>
        </router-link>
        <router-link to="/admin/gallery" class="nav-item" active-class="active">
          <i class="pi pi-images"></i>
          <span>Gallery</span>
        </router-link>
        <router-link to="/admin/contacts" class="nav-item" active-class="active">
          <i class="pi pi-envelope"></i>
          <span>Contacts</span>
          <span v-if="stats.newContacts" class="badge">{{ stats.newContacts }}</span>
        </router-link>
        <router-link to="/admin/bookings" class="nav-item" active-class="active">
          <i class="pi pi-calendar"></i>
          <span>Bookings</span>
          <span v-if="stats.newBookings" class="badge">{{ stats.newBookings }}</span>
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <div class="user-info">
          <i class="pi pi-user"></i>
          <span>{{ user?.name || 'Admin' }}</span>
        </div>
        <button @click="handleLogout" class="logout-btn">
          <i class="pi pi-sign-out"></i>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="admin-main">
      <div class="admin-content">
        <h1>Dashboard</h1>

        <div v-if="loading" class="loading">
          <ProgressSpinner />
        </div>

        <template v-else>
          <!-- Stats Cards -->
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="pi pi-images"></i>
              </div>
              <div class="stat-info">
                <span class="stat-value">{{ stats.galleryItems }}</span>
                <span class="stat-label">Gallery Items</span>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon highlight">
                <i class="pi pi-envelope"></i>
              </div>
              <div class="stat-info">
                <span class="stat-value">{{ stats.newContacts }}</span>
                <span class="stat-label">New Contacts</span>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon highlight">
                <i class="pi pi-calendar"></i>
              </div>
              <div class="stat-info">
                <span class="stat-value">{{ stats.newBookings }}</span>
                <span class="stat-label">New Bookings</span>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="pi pi-check-circle"></i>
              </div>
              <div class="stat-info">
                <span class="stat-value">{{ stats.totalBookings }}</span>
                <span class="stat-label">Total Bookings</span>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="dashboard-grid">
            <!-- Recent Contacts -->
            <div class="dashboard-card">
              <div class="card-header">
                <h2>Recent Contacts</h2>
                <router-link to="/admin/contacts" class="view-all">View All</router-link>
              </div>
              <div class="card-content">
                <div v-if="recentContacts.length === 0" class="empty">
                  No recent contacts
                </div>
                <div v-else class="activity-list">
                  <div v-for="contact in recentContacts" :key="contact.id" class="activity-item">
                    <div class="activity-info">
                      <strong>{{ contact.name }}</strong>
                      <span>{{ contact.email }}</span>
                    </div>
                    <Tag :value="contact.status" :severity="getStatusSeverity(contact.status)" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Recent Bookings -->
            <div class="dashboard-card">
              <div class="card-header">
                <h2>Recent Bookings</h2>
                <router-link to="/admin/bookings" class="view-all">View All</router-link>
              </div>
              <div class="card-content">
                <div v-if="recentBookings.length === 0" class="empty">
                  No recent bookings
                </div>
                <div v-else class="activity-list">
                  <div v-for="booking in recentBookings" :key="booking.id" class="activity-item">
                    <div class="activity-info">
                      <strong>{{ booking.name }}</strong>
                      <span>{{ formatEventType(booking.event_type) }}</span>
                    </div>
                    <Tag :value="booking.status" :severity="getBookingStatusSeverity(booking.status)" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Upcoming Events -->
          <div class="dashboard-card full-width">
            <div class="card-header">
              <h2>Upcoming Events</h2>
            </div>
            <div class="card-content">
              <div v-if="upcomingEvents.length === 0" class="empty">
                No upcoming events
              </div>
              <DataTable v-else :value="upcomingEvents" class="events-table">
                <Column field="name" header="Client" />
                <Column field="event_type" header="Type">
                  <template #body="{ data }">
                    {{ formatEventType(data.event_type) }}
                  </template>
                </Column>
                <Column field="event_date" header="Date">
                  <template #body="{ data }">
                    {{ formatDate(data.event_date) }}
                  </template>
                </Column>
                <Column field="location" header="Location" />
                <Column field="guest_count" header="Guests" />
              </DataTable>
            </div>
          </div>
        </template>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useApi } from '@/composables/useApi'

const { user, logout } = useAuth()
const api = useApi()

const loading = ref(true)
const stats = ref({
  galleryItems: 0,
  newContacts: 0,
  newBookings: 0,
  totalContacts: 0,
  totalBookings: 0
})
const recentContacts = ref([])
const recentBookings = ref([])
const upcomingEvents = ref([])

const handleLogout = () => {
  logout()
}

const getStatusSeverity = (status) => {
  const map = { new: 'danger', read: 'info', replied: 'success', archived: 'secondary' }
  return map[status] || 'info'
}

const getBookingStatusSeverity = (status) => {
  const map = { new: 'danger', contacted: 'warn', confirmed: 'success', completed: 'success', cancelled: 'secondary' }
  return map[status] || 'info'
}

const formatEventType = (type) => {
  const map = {
    market: 'Market',
    private_party: 'Private Party',
    corporate: 'Corporate',
    bridal: 'Bridal',
    popup: 'Pop-up',
    other: 'Other'
  }
  return map[type] || type
}

const formatDate = (date) => {
  if (!date) return 'TBD'
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

onMounted(async () => {
  try {
    const data = await api.get('/admin/dashboard')
    stats.value = data.stats
    recentContacts.value = data.recentContacts || []
    recentBookings.value = data.recentBookings || []
    upcomingEvents.value = data.upcomingEvents || []
  } catch (err) {
    console.error('Failed to load dashboard:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #0a0a0a;
}

/* Sidebar */
.admin-sidebar {
  width: 260px;
  background: #000;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
  font-size: 1.25rem;
  font-weight: 300;
  letter-spacing: 0.3em;
  color: #fff;
  text-decoration: none;
}

.admin-badge {
  font-size: 0.65rem;
  padding: 0.25rem 0.5rem;
  background: rgba(192, 192, 192, 0.2);
  color: #c0c0c0;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.2s ease;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.nav-item.active {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-left: 2px solid #fff;
}

.nav-item i {
  font-size: 1.1rem;
}

.nav-item .badge {
  margin-left: auto;
  background: #ef4444;
  color: #fff;
  font-size: 0.7rem;
  padding: 0.15rem 0.5rem;
  border-radius: 10px;
}

.sidebar-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
}

.logout-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.2s ease;
}

.logout-btn:hover {
  color: #ef4444;
}

/* Main Content */
.admin-main {
  flex: 1;
  margin-left: 260px;
  padding: 2rem;
}

.admin-content h1 {
  font-size: 1.75rem;
  font-weight: 400;
  margin-bottom: 2rem;
}

.loading {
  display: flex;
  justify-content: center;
  padding: 4rem;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.stat-icon i {
  font-size: 1.25rem;
  color: #c0c0c0;
}

.stat-icon.highlight {
  background: rgba(239, 68, 68, 0.1);
}

.stat-icon.highlight i {
  color: #ef4444;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 500;
}

.stat-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
}

/* Dashboard Grid */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.dashboard-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dashboard-card.full-width {
  grid-column: span 2;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.card-header h2 {
  font-size: 1rem;
  font-weight: 500;
}

.view-all {
  font-size: 0.8rem;
  color: #c0c0c0;
  text-decoration: none;
}

.view-all:hover {
  color: #fff;
}

.card-content {
  padding: 1rem 1.5rem;
}

.empty {
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
  padding: 2rem;
  font-size: 0.9rem;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.activity-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.activity-info strong {
  font-size: 0.9rem;
  font-weight: 500;
}

.activity-info span {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
}

/* Responsive */
@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 1024px) {
  .admin-sidebar {
    width: 200px;
  }

  .admin-main {
    margin-left: 200px;
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-card.full-width {
    grid-column: span 1;
  }
}

@media (max-width: 768px) {
  .admin-sidebar {
    display: none;
  }

  .admin-main {
    margin-left: 0;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
