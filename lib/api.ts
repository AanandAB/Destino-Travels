import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

export async function submitEnquiry(data: Record<string, unknown>) {
  const response = await api.post('/enquiry', data)
  return response.data
}

export default api
