<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Hero Section -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">
        Order Food Online
      </h1>
      <p class="text-lg text-gray-600 mb-6">
        Delicious food delivered to your doorstep
      </p>
      
      <!-- Filter Tabs -->
      <div class="max-w-md mx-auto mb-8">
        <FilterTabs 
          :active-filter="activeFilter" 
          @filter-change="handleFilterChange"
        />
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      <p class="mt-2 text-gray-600">Loading delicious food...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-600 mb-4">{{ error }}</p>
      <button @click="fetchFoods" class="btn-primary">
        Try Again
      </button>
    </div>

    <!-- Food Grid -->
    <div v-else-if="foods.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <FoodCard 
        v-for="food in foods" 
        :key="food.id" 
        :food="food"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <p class="text-gray-600 text-lg">
        No {{ activeFilter === 'all' ? '' : activeFilter }} food items found
      </p>
    </div>
  </div>
</template>

<script>
import { foodService } from '../services/api.js'
import FoodCard from '../components/FoodCard.vue'
import FilterTabs from '../components/FilterTabs.vue'

export default {
  name: 'Home',
  components: {
    FoodCard,
    FilterTabs
  },
  data() {
    return {
      foods: [],
      loading: false,
      error: null,
      activeFilter: 'all'
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
        const category = this.activeFilter === 'all' ? null : this.activeFilter
        const response = await foodService.getFoods(category)
        this.foods = response.data.data
      } catch (error) {
        this.error = 'Failed to load food items. Please try again.'
        console.error('Error fetching foods:', error)
      } finally {
        this.loading = false
      }
    },
    
    handleFilterChange(filter) {
      this.activeFilter = filter
      this.fetchFoods()
    }
  }
}
</script>