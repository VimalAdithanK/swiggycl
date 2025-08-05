<template>
  <div class="card hover:shadow-lg transition-shadow">
    <div class="relative">
      <img 
        :src="food.image" 
        :alt="food.name"
        class="w-full h-48 object-cover"
        @error="handleImageError"
      />
      <div class="absolute top-2 left-2">
        <span 
          class="px-2 py-1 text-xs font-semibold rounded-full"
          :class="food.category === 'veg' ? 'bg-success text-white' : 'bg-danger text-white'"
        >
          {{ food.category === 'veg' ? '🟢 VEG' : '🔴 NON-VEG' }}
        </span>
      </div>
      <div class="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-semibold">
        ⭐ {{ food.rating }}
      </div>
    </div>
    
    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-800 mb-1">{{ food.name }}</h3>
      <p class="text-sm text-gray-600 mb-2">{{ food.restaurant }}</p>
      <p class="text-sm text-gray-500 mb-3 line-clamp-2">{{ food.description }}</p>
      
      <div class="flex justify-between items-center">
        <div class="flex flex-col">
          <span class="text-lg font-bold text-gray-800">₹{{ food.price }}</span>
          <span class="text-xs text-gray-500">{{ food.preparationTime }}</span>
        </div>
        <button class="btn-primary text-sm">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FoodCard',
  props: {
    food: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleImageError(event) {
      event.target.src = 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400'
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>