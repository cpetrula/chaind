<template>
  <div class="admin-login">
    <div class="login-card">
      <div class="login-header">
        <img src="@/assets/images/logo.svg" alt="Chaind" class="login-logo" />
        <p>Admin Portal</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <InputText 
            id="email" 
            v-model="email" 
            type="email"
            placeholder="admin@chaind.com"
            :class="{ 'p-invalid': error }"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <Password 
            id="password" 
            v-model="password"
            :feedback="false"
            toggleMask
            placeholder="Enter password"
            :class="{ 'p-invalid': error }"
          />
        </div>

        <Message v-if="error" severity="error" :closable="false">
          {{ error }}
        </Message>

        <Button 
          type="submit" 
          label="Sign In"
          :loading="loading"
          class="login-btn"
        />
      </form>

      <div class="login-footer">
        <router-link to="/">← Back to Website</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const route = useRoute()
const { login } = useAuth()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  error.value = ''
  loading.value = true

  try {
    await login(email.value, password.value)
    const redirect = route.query.redirect || '/admin'
    router.push(redirect)
  } catch (err) {
    error.value = err.message || 'Invalid credentials'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.admin-login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  padding: 2rem;
}

.login-card {
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 3rem;
}

.login-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.login-logo {
  height: 48px;
  width: auto;
  margin-bottom: 1rem;
}

.login-header p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

:deep(.p-inputtext),
:deep(.p-password-input) {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 0.875rem 1rem;
  font-size: 1rem;
  border-radius: 0;
  width: 100%;
}

:deep(.p-inputtext:focus),
:deep(.p-password-input:focus) {
  border-color: #c0c0c0;
  box-shadow: none;
}

:deep(.p-password) {
  width: 100%;
}

.login-btn {
  background: #fff;
  color: #000;
  border: none;
  padding: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 0;
  width: 100%;
}

.login-btn:hover:not(:disabled) {
  background: #c0c0c0;
}

.login-footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.login-footer a {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.3s ease;
}

.login-footer a:hover {
  color: #fff;
}
</style>
