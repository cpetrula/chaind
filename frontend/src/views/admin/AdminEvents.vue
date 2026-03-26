<template>
  <div class="admin-layout">
    <!-- Sidebar (shared) -->
    <aside class="admin-sidebar">
      <div class="sidebar-header">
        <router-link to="/" class="logo">CHAIND</router-link>
        <span class="admin-badge">Admin</span>
      </div>
      <nav class="sidebar-nav">
        <router-link to="/admin" class="nav-item"><i class="pi pi-home"></i><span>Dashboard</span></router-link>
        <router-link to="/admin/gallery" class="nav-item"><i class="pi pi-images"></i><span>Gallery</span></router-link>
        <router-link to="/admin/events" class="nav-item active"><i class="pi pi-calendar"></i><span>Events</span></router-link>
        <router-link to="/admin/contacts" class="nav-item"><i class="pi pi-envelope"></i><span>Contacts</span></router-link>
        <router-link to="/admin/bookings" class="nav-item"><i class="pi pi-calendar-plus"></i><span>Bookings</span></router-link>
      </nav>
      <div class="sidebar-footer">
        <button @click="logout" class="logout-btn"><i class="pi pi-sign-out"></i> Logout</button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="admin-main">
      <div class="admin-content">
        <div class="page-header">
          <h1>Events Calendar Management</h1>
          <Button label="Add Event" icon="pi pi-plus" @click="openAddDialog" />
        </div>

        <div v-if="loading" class="loading"><ProgressSpinner /></div>

        <DataTable v-else :value="events" class="events-table" responsiveLayout="scroll" sortField="event_date" :sortOrder="1">
          <Column header="Image" style="width: 100px">
            <template #body="{ data }">
              <img v-if="data.image_url" :src="data.image_url" :alt="data.name" class="thumb" />
              <div v-else class="thumb-placeholder"><i class="pi pi-calendar"></i></div>
            </template>
          </Column>
          <Column field="name" header="Event Name" sortable />
          <Column field="event_date" header="Date" sortable style="width: 120px">
            <template #body="{ data }">
              {{ formatDate(data.event_date) }}
            </template>
          </Column>
          <Column header="Time" style="width: 150px">
            <template #body="{ data }">
              {{ formatTime(data.start_time) }} - {{ formatTime(data.end_time) }}
            </template>
          </Column>
          <Column field="location_name" header="Location" />
          <Column field="city" header="City" style="width: 120px" />
          <Column field="status" header="Status" style="width: 120px">
            <template #body="{ data }">
              <Tag :value="data.status" :severity="getStatusSeverity(data.status)" />
            </template>
          </Column>
          <Column header="Actions" style="width: 120px">
            <template #body="{ data }">
              <Button icon="pi pi-pencil" text @click="openEditDialog(data)" />
              <Button icon="pi pi-trash" text severity="danger" @click="confirmDelete(data)" />
            </template>
          </Column>
        </DataTable>

        <!-- Add/Edit Dialog -->
        <Dialog v-model:visible="dialogVisible" :header="isEdit ? 'Edit Event' : 'Add Event'" :modal="true" :style="{ width: '600px' }">
          <div class="dialog-form">
            <div class="form-group">
              <label>Event Name *</label>
              <InputText v-model="form.name" placeholder="e.g., Weekend Market Pop-Up" />
            </div>
            
            <div class="form-group">
              <label>Description</label>
              <Textarea v-model="form.description" rows="3" placeholder="Brief event description" />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Event Date *</label>
                <Calendar v-model="form.event_date" dateFormat="yy-mm-dd" showIcon />
              </div>
              <div class="form-group">
                <label>Start Time *</label>
                <Calendar v-model="form.start_time" timeOnly showIcon />
              </div>
              <div class="form-group">
                <label>End Time *</label>
                <Calendar v-model="form.end_time" timeOnly showIcon />
              </div>
            </div>

            <div class="form-group">
              <label>Location Name</label>
              <InputText v-model="form.location_name" placeholder="e.g., Highland Park Community Center" />
            </div>

            <div class="form-group">
              <label>Street Address</label>
              <InputText v-model="form.street_address" placeholder="123 Main Street" />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>City</label>
                <InputText v-model="form.city" placeholder="Los Angeles" />
              </div>
              <div class="form-group">
                <label>State</label>
                <InputText v-model="form.state" placeholder="CA" />
              </div>
              <div class="form-group">
                <label>Zip Code</label>
                <InputText v-model="form.zip_code" placeholder="90042" />
              </div>
            </div>

            <div class="form-group">
              <label>Status</label>
              <Select v-model="form.status" :options="statuses" placeholder="Select status" />
            </div>

            <div class="form-group">
              <label>Image URL</label>
              <InputText v-model="form.image_url" placeholder="https://..." />
            </div>

            <div class="form-group">
              <label>Or Upload Image</label>
              <FileUpload mode="basic" accept="image/*" :maxFileSize="10000000" @select="onFileSelect" chooseLabel="Choose File" />
            </div>

            <small class="form-hint">* Required fields</small>
          </div>
          <template #footer>
            <Button label="Cancel" text @click="dialogVisible = false" />
            <Button :label="isEdit ? 'Update' : 'Add'" @click="saveEvent" :loading="saving" />
          </template>
        </Dialog>

        <!-- Delete Confirmation -->
        <Dialog v-model:visible="deleteVisible" header="Confirm Delete" :modal="true" :style="{ width: '400px' }">
          <p>Are you sure you want to delete "{{ deleteTarget?.name }}"?</p>
          <template #footer>
            <Button label="Cancel" text @click="deleteVisible = false" />
            <Button label="Delete" severity="danger" @click="deleteEvent" :loading="deleting" />
          </template>
        </Dialog>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '@/composables/useApi'
import { useAuth } from '@/composables/useAuth'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Select from 'primevue/select'
import Calendar from 'primevue/calendar'
import FileUpload from 'primevue/fileupload'
import Tag from 'primevue/tag'
import ProgressSpinner from 'primevue/progressspinner'

const router = useRouter()
const api = useApi()
const auth = useAuth()

const events = ref([])
const loading = ref(true)
const dialogVisible = ref(false)
const deleteVisible = ref(false)
const deleteTarget = ref(null)
const isEdit = ref(false)
const saving = ref(false)
const deleting = ref(false)
const selectedFile = ref(null)

const statuses = ['upcoming', 'completed', 'cancelled']

const form = ref({
  name: '',
  description: '',
  location_name: '',
  street_address: '',
  city: '',
  state: '',
  zip_code: '',
  event_date: null,
  start_time: null,
  end_time: null,
  status: 'upcoming',
  image_url: ''
})

const fetchEvents = async () => {
  try {
    loading.value = true
    const response = await api.get('/events?includeAll=true')
    events.value = response.events
  } catch (error) {
    console.error('Failed to fetch events:', error)
  } finally {
    loading.value = false
  }
}

const openAddDialog = () => {
  isEdit.value = false
  form.value = {
    name: '',
    description: '',
    location_name: '',
    street_address: '',
    city: '',
    state: '',
    zip_code: '',
    event_date: null,
    start_time: null,
    end_time: null,
    status: 'upcoming',
    image_url: ''
  }
  selectedFile.value = null
  dialogVisible.value = true
}

const openEditDialog = (event) => {
  isEdit.value = true
  form.value = {
    id: event.id,
    name: event.name,
    description: event.description || '',
    location_name: event.location_name || '',
    street_address: event.street_address || '',
    city: event.city || '',
    state: event.state || '',
    zip_code: event.zip_code || '',
    event_date: event.event_date ? new Date(event.event_date) : null,
    start_time: event.start_time ? parseTimeToDate(event.start_time) : null,
    end_time: event.end_time ? parseTimeToDate(event.end_time) : null,
    status: event.status,
    image_url: event.image_url || ''
  }
  selectedFile.value = null
  dialogVisible.value = true
}

const parseTimeToDate = (timeString) => {
  if (!timeString) return null
  const [hours, minutes] = timeString.split(':')
  const date = new Date()
  date.setHours(parseInt(hours))
  date.setMinutes(parseInt(minutes))
  date.setSeconds(0)
  return date
}

const formatTimeForAPI = (dateObj) => {
  if (!dateObj) return null
  const hours = String(dateObj.getHours()).padStart(2, '0')
  const minutes = String(dateObj.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}:00`
}

const formatDateForAPI = (dateObj) => {
  if (!dateObj) return null
  const year = dateObj.getFullYear()
  const month = String(dateObj.getMonth() + 1).padStart(2, '0')
  const day = String(dateObj.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const onFileSelect = (event) => {
  selectedFile.value = event.files[0]
}

const saveEvent = async () => {
  if (!form.value.name || !form.value.event_date || !form.value.start_time || !form.value.end_time) {
    alert('Please fill in all required fields')
    return
  }

  try {
    saving.value = true
    const formData = new FormData()
    formData.append('name', form.value.name)
    formData.append('description', form.value.description)
    formData.append('location_name', form.value.location_name)
    formData.append('street_address', form.value.street_address)
    formData.append('city', form.value.city)
    formData.append('state', form.value.state)
    formData.append('zip_code', form.value.zip_code)
    formData.append('event_date', formatDateForAPI(form.value.event_date))
    formData.append('start_time', formatTimeForAPI(form.value.start_time))
    formData.append('end_time', formatTimeForAPI(form.value.end_time))
    formData.append('status', form.value.status)
    formData.append('image_url', form.value.image_url)

    if (selectedFile.value) {
      formData.append('image', selectedFile.value)
    }

    if (isEdit.value) {
      await api.put(`/events/${form.value.id}`, formData)
    } else {
      await api.post('/events', formData)
    }

    dialogVisible.value = false
    await fetchEvents()
  } catch (error) {
    console.error('Failed to save event:', error)
    alert('Failed to save event')
  } finally {
    saving.value = false
  }
}

const confirmDelete = (event) => {
  deleteTarget.value = event
  deleteVisible.value = true
}

const deleteEvent = async () => {
  try {
    deleting.value = true
    await api.delete(`/events/${deleteTarget.value.id}`)
    deleteVisible.value = false
    await fetchEvents()
  } catch (error) {
    console.error('Failed to delete event:', error)
    alert('Failed to delete event')
  } finally {
    deleting.value = false
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const formatTime = (timeString) => {
  if (!timeString) return ''
  const [hours, minutes] = timeString.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${ampm}`
}

const getStatusSeverity = (status) => {
  switch (status) {
    case 'upcoming': return 'success'
    case 'completed': return 'secondary'
    case 'cancelled': return 'danger'
    default: return 'info'
  }
}

const logout = () => {
  auth.logout()
  router.push('/admin/login')
}

onMounted(() => {
  fetchEvents()
})
</script>

<style scoped>
/* Admin Layout */
.admin-layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  min-height: 100vh;
  background: #f5f5f5;
}

/* Sidebar */
.admin-sidebar {
  background: #1a1a2e;
  color: white;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;
}

.admin-badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
}

.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.2s;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-item.active {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border-left: 3px solid white;
}

.nav-item i {
  font-size: 1.1rem;
}

.sidebar-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.logout-btn {
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  transition: all 0.2s;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Main Content */
.admin-main {
  overflow-y: auto;
}

.admin-content {
  padding: 2rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
}

.loading {
  text-align: center;
  padding: 4rem;
}

.events-table {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.thumb {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.thumb-placeholder {
  width: 80px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  border-radius: 4px;
  color: #999;
}

/* Dialog Form */
.dialog-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  font-size: 0.9rem;
}

.form-hint {
  color: #666;
  font-style: italic;
  margin-top: 0.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .admin-layout {
    grid-template-columns: 1fr;
  }

  .admin-sidebar {
    display: none;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
