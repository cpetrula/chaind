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
        <router-link to="/admin/gallery" class="nav-item active"><i class="pi pi-images"></i><span>Gallery</span></router-link>
        <router-link to="/admin/contacts" class="nav-item"><i class="pi pi-envelope"></i><span>Contacts</span></router-link>
        <router-link to="/admin/bookings" class="nav-item"><i class="pi pi-calendar"></i><span>Bookings</span></router-link>
      </nav>
      <div class="sidebar-footer">
        <button @click="logout" class="logout-btn"><i class="pi pi-sign-out"></i> Logout</button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="admin-main">
      <div class="admin-content">
        <div class="page-header">
          <h1>Gallery Management</h1>
          <Button label="Add Image" icon="pi pi-plus" @click="openAddDialog" />
        </div>

        <div v-if="loading" class="loading"><ProgressSpinner /></div>

        <DataTable v-else :value="images" class="gallery-table" responsiveLayout="scroll">
          <Column header="Image" style="width: 100px">
            <template #body="{ data }">
              <img :src="data.image_url" :alt="data.title" class="thumb" />
            </template>
          </Column>
          <Column field="title" header="Title" sortable />
          <Column field="category" header="Category" sortable>
            <template #body="{ data }">
              <Tag :value="data.category" />
            </template>
          </Column>
          <Column field="featured" header="Featured" style="width: 100px">
            <template #body="{ data }">
              <i :class="data.featured ? 'pi pi-star-fill' : 'pi pi-star'" :style="{ color: data.featured ? '#fbbf24' : '#666' }"></i>
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
        <Dialog v-model:visible="dialogVisible" :header="isEdit ? 'Edit Image' : 'Add Image'" :modal="true" :style="{ width: '500px' }">
          <div class="dialog-form">
            <div class="form-group">
              <label>Title *</label>
              <InputText v-model="form.title" placeholder="Image title" />
            </div>
            <div class="form-group">
              <label>Description</label>
              <Textarea v-model="form.description" rows="3" placeholder="Optional description" />
            </div>
            <div class="form-group">
              <label>Category</label>
              <Select v-model="form.category" :options="categories" placeholder="Select category" />
            </div>
            <div class="form-group">
              <label>Image URL</label>
              <InputText v-model="form.image_url" placeholder="https://..." />
            </div>
            <div class="form-group">
              <label>Or Upload Image</label>
              <FileUpload mode="basic" accept="image/*" :maxFileSize="10000000" @select="onFileSelect" chooseLabel="Choose File" />
            </div>
            <div class="form-group checkbox-group">
              <Checkbox v-model="form.featured" :binary="true" inputId="featured" />
              <label for="featured">Featured</label>
            </div>
          </div>
          <template #footer>
            <Button label="Cancel" text @click="dialogVisible = false" />
            <Button :label="isEdit ? 'Update' : 'Add'" @click="saveImage" :loading="saving" />
          </template>
        </Dialog>

        <!-- Delete Confirmation -->
        <Dialog v-model:visible="deleteVisible" header="Confirm Delete" :modal="true" :style="{ width: '400px' }">
          <p>Are you sure you want to delete "{{ deleteTarget?.title }}"?</p>
          <template #footer>
            <Button label="Cancel" text @click="deleteVisible = false" />
            <Button label="Delete" severity="danger" @click="deleteImage" :loading="deleting" />
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
const images = ref([])
const dialogVisible = ref(false)
const deleteVisible = ref(false)
const isEdit = ref(false)
const saving = ref(false)
const deleting = ref(false)
const deleteTarget = ref(null)
const selectedFile = ref(null)

const categories = ['jewelry', 'events', 'bridal', 'corporate', 'markets']

const form = ref({
  id: null,
  title: '',
  description: '',
  category: 'jewelry',
  image_url: '',
  featured: false
})

const resetForm = () => {
  form.value = { id: null, title: '', description: '', category: 'jewelry', image_url: '', featured: false }
  selectedFile.value = null
}

const openAddDialog = () => {
  resetForm()
  isEdit.value = false
  dialogVisible.value = true
}

const openEditDialog = (data) => {
  form.value = { ...data }
  isEdit.value = true
  dialogVisible.value = true
}

const onFileSelect = (event) => {
  selectedFile.value = event.files[0]
}

const saveImage = async () => {
  saving.value = true
  try {
    const formData = new FormData()
    formData.append('title', form.value.title)
    formData.append('description', form.value.description)
    formData.append('category', form.value.category)
    formData.append('featured', form.value.featured)
    
    if (selectedFile.value) {
      formData.append('image', selectedFile.value)
    } else if (form.value.image_url) {
      formData.append('image_url', form.value.image_url)
    }

    if (isEdit.value) {
      await api.uploadFile(`/gallery/${form.value.id}`, formData)
    } else {
      await api.uploadFile('/gallery', formData)
    }
    
    await loadImages()
    dialogVisible.value = false
  } catch (err) {
    console.error('Save failed:', err)
  } finally {
    saving.value = false
  }
}

const confirmDelete = (data) => {
  deleteTarget.value = data
  deleteVisible.value = true
}

const deleteImage = async () => {
  deleting.value = true
  try {
    await api.del(`/gallery/${deleteTarget.value.id}`)
    await loadImages()
    deleteVisible.value = false
  } catch (err) {
    console.error('Delete failed:', err)
  } finally {
    deleting.value = false
  }
}

const loadImages = async () => {
  try {
    const data = await api.get('/gallery')
    images.value = data.gallery || []
  } catch (err) {
    console.error('Load failed:', err)
  } finally {
    loading.value = false
  }
}

onMounted(loadImages)
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
.logout-btn:hover { color: #fff; }
.admin-main { flex: 1; margin-left: 260px; padding: 2rem; }
.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
.page-header h1 { font-size: 1.75rem; font-weight: 400; }
.loading { display: flex; justify-content: center; padding: 4rem; }
.thumb { width: 60px; height: 60px; object-fit: cover; border-radius: 4px; }
.dialog-form { display: flex; flex-direction: column; gap: 1rem; }
.form-group { display: flex; flex-direction: column; gap: 0.5rem; }
.form-group label { font-size: 0.875rem; font-weight: 500; }
.checkbox-group { flex-direction: row; align-items: center; gap: 0.5rem; }
:deep(.p-inputtext), :deep(.p-textarea), :deep(.p-select) { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); color: #fff; }
</style>
