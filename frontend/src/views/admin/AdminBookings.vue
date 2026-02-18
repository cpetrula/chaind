<template>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <div class="sidebar-header">
        <router-link to="/" class="logo">CHAIND</router-link>
        <span class="admin-badge">Admin</span>
      </div>
      <nav class="sidebar-nav">
        <router-link to="/admin" class="nav-item"><i class="pi pi-home"></i><span>Dashboard</span></router-link>
        <router-link to="/admin/gallery" class="nav-item"><i class="pi pi-images"></i><span>Gallery</span></router-link>
        <router-link to="/admin/contacts" class="nav-item"><i class="pi pi-envelope"></i><span>Contacts</span></router-link>
        <router-link to="/admin/bookings" class="nav-item active"><i class="pi pi-calendar"></i><span>Bookings</span></router-link>
      </nav>
      <div class="sidebar-footer">
        <button @click="logout" class="logout-btn"><i class="pi pi-sign-out"></i> Logout</button>
      </div>
    </aside>

    <main class="admin-main">
      <div class="admin-content">
        <div class="page-header">
          <h1>Booking Requests</h1>
          <Select v-model="statusFilter" :options="statusOptions" placeholder="All Statuses" showClear @change="loadBookings" />
        </div>

        <div v-if="loading" class="loading"><ProgressSpinner /></div>

        <DataTable v-else :value="bookings" class="bookings-table" responsiveLayout="scroll">
          <Column field="name" header="Client" sortable />
          <Column field="event_type" header="Event Type" sortable>
            <template #body="{ data }">{{ formatEventType(data.event_type) }}</template>
          </Column>
          <Column field="event_date" header="Event Date" sortable style="width: 120px">
            <template #body="{ data }">{{ data.event_date ? formatDate(data.event_date) : 'TBD' }}</template>
          </Column>
          <Column field="guest_count" header="Guests" style="width: 80px" />
          <Column field="status" header="Status" style="width: 140px">
            <template #body="{ data }">
              <Select v-model="data.status" :options="statuses" @change="updateStatus(data)" size="small" />
            </template>
          </Column>
          <Column field="created_at" header="Submitted" sortable style="width: 120px">
            <template #body="{ data }">{{ formatDate(data.created_at) }}</template>
          </Column>
          <Column header="" style="width: 80px">
            <template #body="{ data }">
              <Button icon="pi pi-eye" text @click="viewBooking(data)" />
              <Button icon="pi pi-trash" text severity="danger" @click="confirmDelete(data)" />
            </template>
          </Column>
        </DataTable>

        <!-- View Dialog -->
        <Dialog v-model:visible="viewVisible" header="Booking Details" :modal="true" :style="{ width: '600px' }">
          <div v-if="selectedBooking" class="booking-details">
            <div class="details-section">
              <h3>Contact Info</h3>
              <div class="detail-row"><label>Name</label><span>{{ selectedBooking.name }}</span></div>
              <div class="detail-row"><label>Email</label><a :href="'mailto:' + selectedBooking.email">{{ selectedBooking.email }}</a></div>
              <div class="detail-row"><label>Phone</label><span>{{ selectedBooking.phone || 'N/A' }}</span></div>
            </div>
            <div class="details-section">
              <h3>Event Details</h3>
              <div class="detail-row"><label>Type</label><span>{{ formatEventType(selectedBooking.event_type) }}</span></div>
              <div class="detail-row"><label>Date</label><span>{{ selectedBooking.event_date ? formatDate(selectedBooking.event_date) : 'TBD' }}</span></div>
              <div class="detail-row"><label>Time</label><span>{{ selectedBooking.event_time || 'TBD' }}</span></div>
              <div class="detail-row"><label>Location</label><span>{{ selectedBooking.location || 'TBD' }}</span></div>
              <div class="detail-row"><label>Guests</label><span>{{ selectedBooking.guest_count || 'TBD' }}</span></div>
              <div class="detail-row"><label>Budget</label><span>{{ selectedBooking.budget_range || 'Not specified' }}</span></div>
              <div class="detail-row"><label>Referral</label><span>{{ selectedBooking.how_heard || 'Not specified' }}</span></div>
            </div>
            <div v-if="selectedBooking.message" class="details-section">
              <h3>Message</h3>
              <p class="message-text">{{ selectedBooking.message }}</p>
            </div>
            <div class="details-section">
              <h3>Notes</h3>
              <Textarea v-model="selectedBooking.notes" rows="3" placeholder="Add internal notes..." />
              <Button label="Save Notes" size="small" @click="saveNotes" :loading="savingNotes" class="save-notes-btn" />
            </div>
          </div>
          <template #footer>
            <Button label="Close" @click="viewVisible = false" />
          </template>
        </Dialog>

        <!-- Delete Confirmation -->
        <Dialog v-model:visible="deleteVisible" header="Confirm Delete" :modal="true" :style="{ width: '400px' }">
          <p>Delete booking from {{ deleteTarget?.name }}?</p>
          <template #footer>
            <Button label="Cancel" text @click="deleteVisible = false" />
            <Button label="Delete" severity="danger" @click="deleteBooking" :loading="deleting" />
          </template>
        </Dialog>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '@/composables/useApi'
import { useAuth } from '@/composables/useAuth'

const api = useApi()
const { logout } = useAuth()

const loading = ref(true)
const bookings = ref([])
const statusFilter = ref(null)
const viewVisible = ref(false)
const deleteVisible = ref(false)
const selectedBooking = ref(null)
const deleteTarget = ref(null)
const deleting = ref(false)
const savingNotes = ref(false)

const statuses = ['new', 'contacted', 'confirmed', 'completed', 'cancelled']
const statusOptions = [
  { label: 'New', value: 'new' },
  { label: 'Contacted', value: 'contacted' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' }
]

const eventTypeMap = {
  market: 'Market',
  private_party: 'Private Party',
  corporate: 'Corporate',
  bridal: 'Bridal',
  popup: 'Pop-up',
  other: 'Other'
}

const formatEventType = (type) => eventTypeMap[type] || type
const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const loadBookings = async () => {
  loading.value = true
  try {
    const params = statusFilter.value ? `?status=${statusFilter.value}` : ''
    const data = await api.get(`/bookings${params}`)
    bookings.value = data.bookings || []
  } catch (err) {
    console.error('Load failed:', err)
  } finally {
    loading.value = false
  }
}

const updateStatus = async (booking) => {
  try {
    await api.patch(`/bookings/${booking.id}`, { status: booking.status })
  } catch (err) {
    console.error('Update failed:', err)
  }
}

const viewBooking = (booking) => {
  selectedBooking.value = { ...booking }
  viewVisible.value = true
  if (booking.status === 'new') {
    booking.status = 'contacted'
    updateStatus(booking)
  }
}

const saveNotes = async () => {
  savingNotes.value = true
  try {
    await api.patch(`/bookings/${selectedBooking.value.id}`, { notes: selectedBooking.value.notes })
    const booking = bookings.value.find(b => b.id === selectedBooking.value.id)
    if (booking) booking.notes = selectedBooking.value.notes
  } catch (err) {
    console.error('Save failed:', err)
  } finally {
    savingNotes.value = false
  }
}

const confirmDelete = (booking) => {
  deleteTarget.value = booking
  deleteVisible.value = true
}

const deleteBooking = async () => {
  deleting.value = true
  try {
    await api.del(`/bookings/${deleteTarget.value.id}`)
    await loadBookings()
    deleteVisible.value = false
  } catch (err) {
    console.error('Delete failed:', err)
  } finally {
    deleting.value = false
  }
}

onMounted(loadBookings)
</script>

<style scoped>
.admin-layout { display: flex; min-height: 100vh; background: #0a0a0a; }
.admin-sidebar { width: 260px; background: #000; border-right: 1px solid rgba(255,255,255,0.1); display: flex; flex-direction: column; position: fixed; top: 0; left: 0; bottom: 0; }
.sidebar-header { padding: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; gap: 1rem; }
.logo { font-size: 1.25rem; font-weight: 300; letter-spacing: 0.3em; color: #fff; text-decoration: none; }
.admin-badge { font-size: 0.65rem; padding: 0.25rem 0.5rem; background: rgba(192,192,192,0.2); color: #c0c0c0; text-transform: uppercase; }
.sidebar-nav { flex: 1; padding: 1rem 0; }
.nav-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.875rem 1.5rem; color: rgba(255,255,255,0.7); text-decoration: none; }
.nav-item:hover, .nav-item.active { background: rgba(255,255,255,0.1); color: #fff; }
.sidebar-footer { padding: 1rem 1.5rem; border-top: 1px solid rgba(255,255,255,0.1); }
.logout-btn { background: transparent; border: none; color: rgba(255,255,255,0.6); cursor: pointer; font-size: 0.875rem; display: flex; align-items: center; gap: 0.5rem; }
.admin-main { flex: 1; margin-left: 260px; padding: 2rem; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
.page-header h1 { font-size: 1.75rem; font-weight: 400; }
.loading { display: flex; justify-content: center; padding: 4rem; }
.booking-details { display: flex; flex-direction: column; gap: 1.5rem; }
.details-section h3 { font-size: 0.9rem; color: #c0c0c0; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid rgba(255,255,255,0.1); }
.detail-row { display: flex; gap: 1rem; margin-bottom: 0.75rem; }
.detail-row label { width: 80px; font-size: 0.8rem; color: rgba(255,255,255,0.5); }
.detail-row span, .detail-row a { flex: 1; }
.message-text { background: rgba(255,255,255,0.05); padding: 1rem; white-space: pre-wrap; }
.save-notes-btn { margin-top: 0.5rem; }
:deep(.p-select), :deep(.p-textarea) { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); color: #fff; }
</style>
