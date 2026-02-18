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
        <router-link to="/admin/contacts" class="nav-item active"><i class="pi pi-envelope"></i><span>Contacts</span></router-link>
        <router-link to="/admin/bookings" class="nav-item"><i class="pi pi-calendar"></i><span>Bookings</span></router-link>
      </nav>
      <div class="sidebar-footer">
        <button @click="logout" class="logout-btn"><i class="pi pi-sign-out"></i> Logout</button>
      </div>
    </aside>

    <main class="admin-main">
      <div class="admin-content">
        <div class="page-header">
          <h1>Contact Inquiries</h1>
          <Select v-model="statusFilter" :options="statusOptions" placeholder="All Statuses" showClear @change="loadContacts" />
        </div>

        <div v-if="loading" class="loading"><ProgressSpinner /></div>

        <DataTable v-else :value="contacts" class="contacts-table" responsiveLayout="scroll">
          <Column field="name" header="Name" sortable />
          <Column field="email" header="Email" sortable />
          <Column field="phone" header="Phone" />
          <Column field="event_type" header="Interest" />
          <Column field="status" header="Status" style="width: 120px">
            <template #body="{ data }">
              <Select v-model="data.status" :options="statuses" @change="updateStatus(data)" size="small" />
            </template>
          </Column>
          <Column field="created_at" header="Date" sortable style="width: 120px">
            <template #body="{ data }">{{ formatDate(data.created_at) }}</template>
          </Column>
          <Column header="" style="width: 80px">
            <template #body="{ data }">
              <Button icon="pi pi-eye" text @click="viewContact(data)" />
              <Button icon="pi pi-trash" text severity="danger" @click="confirmDelete(data)" />
            </template>
          </Column>
        </DataTable>

        <!-- View Dialog -->
        <Dialog v-model:visible="viewVisible" header="Contact Details" :modal="true" :style="{ width: '500px' }">
          <div v-if="selectedContact" class="contact-details">
            <div class="detail-row"><label>Name</label><span>{{ selectedContact.name }}</span></div>
            <div class="detail-row"><label>Email</label><a :href="'mailto:' + selectedContact.email">{{ selectedContact.email }}</a></div>
            <div class="detail-row"><label>Phone</label><span>{{ selectedContact.phone || 'N/A' }}</span></div>
            <div class="detail-row"><label>Interest</label><span>{{ selectedContact.event_type || 'General' }}</span></div>
            <div class="detail-row"><label>Date</label><span>{{ formatDate(selectedContact.created_at) }}</span></div>
            <div class="detail-row full"><label>Message</label><p>{{ selectedContact.message }}</p></div>
          </div>
          <template #footer>
            <Button label="Close" @click="viewVisible = false" />
          </template>
        </Dialog>

        <!-- Delete Confirmation -->
        <Dialog v-model:visible="deleteVisible" header="Confirm Delete" :modal="true" :style="{ width: '400px' }">
          <p>Delete contact from {{ deleteTarget?.name }}?</p>
          <template #footer>
            <Button label="Cancel" text @click="deleteVisible = false" />
            <Button label="Delete" severity="danger" @click="deleteContact" :loading="deleting" />
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
const contacts = ref([])
const statusFilter = ref(null)
const viewVisible = ref(false)
const deleteVisible = ref(false)
const selectedContact = ref(null)
const deleteTarget = ref(null)
const deleting = ref(false)

const statuses = ['new', 'read', 'replied', 'archived']
const statusOptions = [
  { label: 'New', value: 'new' },
  { label: 'Read', value: 'read' },
  { label: 'Replied', value: 'replied' },
  { label: 'Archived', value: 'archived' }
]

const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

const loadContacts = async () => {
  loading.value = true
  try {
    const params = statusFilter.value ? `?status=${statusFilter.value}` : ''
    const data = await api.get(`/contact${params}`)
    contacts.value = data.contacts || []
  } catch (err) {
    console.error('Load failed:', err)
  } finally {
    loading.value = false
  }
}

const updateStatus = async (contact) => {
  try {
    await api.patch(`/contact/${contact.id}`, { status: contact.status })
  } catch (err) {
    console.error('Update failed:', err)
  }
}

const viewContact = (contact) => {
  selectedContact.value = contact
  viewVisible.value = true
  if (contact.status === 'new') {
    contact.status = 'read'
    updateStatus(contact)
  }
}

const confirmDelete = (contact) => {
  deleteTarget.value = contact
  deleteVisible.value = true
}

const deleteContact = async () => {
  deleting.value = true
  try {
    await api.del(`/contact/${deleteTarget.value.id}`)
    await loadContacts()
    deleteVisible.value = false
  } catch (err) {
    console.error('Delete failed:', err)
  } finally {
    deleting.value = false
  }
}

onMounted(loadContacts)
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
.contact-details { display: flex; flex-direction: column; gap: 1rem; }
.detail-row { display: flex; gap: 1rem; }
.detail-row label { width: 80px; font-size: 0.8rem; color: rgba(255,255,255,0.5); text-transform: uppercase; }
.detail-row span, .detail-row a, .detail-row p { flex: 1; }
.detail-row.full { flex-direction: column; }
.detail-row.full p { background: rgba(255,255,255,0.05); padding: 1rem; margin-top: 0.5rem; white-space: pre-wrap; }
:deep(.p-select) { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); color: #fff; }
</style>
