import axios from 'axios'

const API_BASE_URL = 'https://work-2-hcgswrybiapicpzv.prod-runtime.all-hands.dev/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const foodService = {
  // Get all foods with optional category filter
  getFoods(category = null) {
    const params = category ? { category } : {}
    return api.get('/foods', { params })
  },

  // Get single food item
  getFood(id) {
    return api.get(`/foods/${id}`)
  },

  // Create new food item
  createFood(foodData) {
    return api.post('/foods', foodData)
  },

  // Update food item
  updateFood(id, foodData) {
    return api.put(`/foods/${id}`, foodData)
  },

  // Delete food item
  deleteFood(id) {
    return api.delete(`/foods/${id}`)
  }
}

export default api