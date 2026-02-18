import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from './useApi'

const user = ref(null)
const token = ref(localStorage.getItem('chaind_token'))

/**
 * Composable for authentication
 */
export function useAuth() {
  const router = useRouter()
  const api = useApi()

  const isAuthenticated = computed(() => !!token.value)

  const login = async (email, password) => {
    const data = await api.post('/auth/login', { email, password })
    
    token.value = data.token
    user.value = data.user
    localStorage.setItem('chaind_token', data.token)
    
    return data
  }

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('chaind_token')
    router.push({ name: 'admin-login' })
  }

  const checkAuth = async () => {
    if (!token.value) {
      return false
    }

    try {
      const data = await api.get('/auth/me')
      user.value = data.user
      return true
    } catch (err) {
      logout()
      return false
    }
  }

  const changePassword = async (currentPassword, newPassword) => {
    return api.post('/auth/change-password', { currentPassword, newPassword })
  }

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    checkAuth,
    changePassword
  }
}
