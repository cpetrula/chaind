import { ref } from 'vue'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

/**
 * Composable for API calls
 */
export function useApi() {
  const loading = ref(false)
  const error = ref(null)

  const getAuthHeaders = () => {
    const token = localStorage.getItem('chaind_token')
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  const request = async (endpoint, options = {}) => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(),
          ...options.headers
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Request failed')
      }

      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const get = (endpoint) => request(endpoint, { method: 'GET' })
  
  const post = (endpoint, body) => request(endpoint, {
    method: 'POST',
    body: JSON.stringify(body)
  })

  const put = (endpoint, body) => request(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body)
  })

  const patch = (endpoint, body) => request(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(body)
  })

  const del = (endpoint) => request(endpoint, { method: 'DELETE' })

  // Special method for file uploads
  const uploadFile = async (endpoint, formData) => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed')
      }

      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    get,
    post,
    put,
    patch,
    del,
    uploadFile
  }
}
