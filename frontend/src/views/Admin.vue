<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">Admin Panel</h1>
        <p class="text-gray-600 mt-1">Manage food items</p>
      </div>
      <button @click="openAddForm" class="btn-primary">
        + Add New Food Item
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="card p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-blue-100 text-blue-600">
            🍽️
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Items</p>
            <p class="text-2xl font-semibold text-gray-900">{{ totalItems }}</p>
          </div>
        </div>
      </div>
      
      <div class="card p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-green-100 text-green-600">
            🟢
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Veg Items</p>
            <p class="text-2xl font-semibold text-gray-900">{{ vegItems }}</p>
          </div>
        </div>
      </div>
      
      <div class="card p-6">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-red-100 text-red-600">
            🔴
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Non-Veg Items</p>
            <p class="text-2xl font-semibold text-gray-900">{{ nonVegItems }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filter Tabs -->
    <div class="mb-6">
      <FilterTabs 
        :active-filter="activeFilter" 
        @filter-change="handleFilterChange"
      />
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      <p class="mt-2 text-gray-600">Loading food items...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-600 mb-4">{{ error }}</p>
      <button @click="fetchFoods" class="btn-primary">
        Try Again
      </button>
    </div>

    <!-- Food Items Table -->
    <div v-else-if="foods.length > 0" class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Food Item
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Restaurant
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="food in foods" :key="food.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <img 
                    :src="food.image" 
                    :alt="food.name"
                    class="h-12 w-12 rounded-lg object-cover mr-4"
                    @error="handleImageError"
                  />
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ food.name }}</div>
                    <div class="text-sm text-gray-500">{{ food.preparationTime }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="px-2 py-1 text-xs font-semibold rounded-full"
                  :class="food.category === 'veg' ? 'bg-success text-white' : 'bg-danger text-white'"
                >
                  {{ food.category === 'veg' ? '🟢 VEG' : '🔴 NON-VEG' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ₹{{ food.price }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ food.restaurant }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ⭐ {{ food.rating }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button 
                  @click="openEditForm(food)"
                  class="text-blue-600 hover:text-blue-900"
                >
                  Edit
                </button>
                <button 
                  @click="deleteFood(food)"
                  class="text-red-600 hover:text-red-900"
                  :disabled="deleteLoading === food.id"
                >
                  {{ deleteLoading === food.id ? 'Deleting...' : 'Delete' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <p class="text-gray-600 text-lg mb-4">
        No {{ activeFilter === 'all' ? '' : activeFilter }} food items found
      </p>
      <button @click="openAddForm" class="btn-primary">
        Add Your First Food Item
      </button>
    </div>

    <!-- Food Form Modal -->
    <FoodForm
      :show="showForm"
      :food="selectedFood"
      :loading="formLoading"
      @close="closeForm"
      @submit="handleFormSubmit"
    />
  </div>
</template>

<script>
import { foodService } from '../services/api.js'
import FoodForm from '../components/FoodForm.vue'
import FilterTabs from '../components/FilterTabs.vue'

export default {
  name: 'Admin',
  components: {
    FoodForm,
    FilterTabs
  },
  data() {
    return {
      foods: [],
      allFoods: [],
      loading: false,
      error: null,
      activeFilter: 'all',
      showForm: false,
      selectedFood: null,
      formLoading: false,
      deleteLoading: null
    }
  },
  computed: {
    totalItems() {
      return this.allFoods.length
    },
    vegItems() {
      return this.allFoods.filter(food => food.category === 'veg').length
    },
    nonVegItems() {
      return this.allFoods.filter(food => food.category === 'non-veg').length
    }
  },
  mounted() {
    this.fetchFoods()
  },
  methods: {
    async fetchFoods() {
      this.loading = true
      this.error = null
      
      try {
        const response = await foodService.getFoods()
        this.allFoods = response.data.data
        this.filterFoods()
      } catch (error) {
        this.error = 'Failed to load food items. Please try again.'
        console.error('Error fetching foods:', error)
      } finally {
        this.loading = false
      }
    },
    
    filterFoods() {
      if (this.activeFilter === 'all') {
        this.foods = this.allFoods
      } else {
        this.foods = this.allFoods.filter(food => food.category === this.activeFilter)
      }
    },
    
    handleFilterChange(filter) {
      this.activeFilter = filter
      this.filterFoods()
    },
    
    openAddForm() {
      this.selectedFood = null
      this.showForm = true
    },
    
    openEditForm(food) {
      this.selectedFood = food
      this.showForm = true
    },
    
    closeForm() {
      this.showForm = false
      this.selectedFood = null
    },
    
    async handleFormSubmit(formData) {
      this.formLoading = true
      
      try {
        if (this.selectedFood) {
          // Update existing food
          await foodService.updateFood(this.selectedFood.id, formData)
        } else {
          // Create new food
          await foodService.createFood(formData)
        }
        
        this.closeForm()
        await this.fetchFoods()
      } catch (error) {
        console.error('Error saving food:', error)
        alert('Failed to save food item. Please try again.')
      } finally {
        this.formLoading = false
      }
    },
    
    async deleteFood(food) {
      if (!confirm(`Are you sure you want to delete "${food.name}"?`)) {
        return
      }
      
      this.deleteLoading = food.id
      
      try {
        await foodService.deleteFood(food.id)
        await this.fetchFoods()
      } catch (error) {
        console.error('Error deleting food:', error)
        alert('Failed to delete food item. Please try again.')
      } finally {
        this.deleteLoading = null
      }
    },
    
    handleImageError(event) {
      event.target.src = 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400'
    }
  }
}
</script>