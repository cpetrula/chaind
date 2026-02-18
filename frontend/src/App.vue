<script setup>
import { ref, onMounted } from 'vue'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Message from 'primevue/message'

const apiStatus = ref('')
const apiData = ref(null)
const loading = ref(false)

const checkAPI = async () => {
  loading.value = true
  try {
    const response = await fetch('http://localhost:3000/api/health')
    const data = await response.json()
    apiStatus.value = 'success'
    apiData.value = data
  } catch (error) {
    apiStatus.value = 'error'
    apiData.value = { error: error.message }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  checkAPI()
})
</script>

<template>
  <div class="container">
    <Card>
      <template #title>
        <div class="header">
          <i class="pi pi-link" style="font-size: 2rem"></i>
          <h1>Chaind</h1>
        </div>
      </template>
      <template #subtitle>
        Node.js + Vue.js + PrimeVue + Vite + MySQL
      </template>
      <template #content>
        <div class="content">
          <Message v-if="apiStatus === 'success'" severity="success">
            Backend API is connected! Status: {{ apiData?.status }}
          </Message>
          <Message v-else-if="apiStatus === 'error'" severity="error">
            Backend API connection failed. Make sure the backend server is running on port 3000.
          </Message>
          <Message v-else severity="info">
            Checking backend connection...
          </Message>
          
          <div class="tech-stack">
            <h3>Technology Stack:</h3>
            <ul>
              <li><i class="pi pi-check-circle"></i> Node.js - Backend server</li>
              <li><i class="pi pi-check-circle"></i> Vue.js - Frontend framework</li>
              <li><i class="pi pi-check-circle"></i> PrimeVue - UI component library</li>
              <li><i class="pi pi-check-circle"></i> Vite - Build tool</li>
              <li><i class="pi pi-check-circle"></i> MySQL - Database</li>
            </ul>
          </div>
          
          <Button 
            label="Refresh Connection" 
            icon="pi pi-refresh" 
            @click="checkAPI" 
            :loading="loading"
            severity="primary"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
}

.header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header h1 {
  margin: 0;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.tech-stack ul {
  list-style: none;
  padding: 0;
}

.tech-stack li {
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tech-stack i {
  color: #4caf50;
}
</style>
