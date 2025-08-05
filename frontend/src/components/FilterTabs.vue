<template>
  <div class="flex space-x-1 bg-gray-100 p-1 rounded-lg">
    <button
      v-for="filter in filters"
      :key="filter.value"
      @click="$emit('filter-change', filter.value)"
      class="flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors"
      :class="activeFilter === filter.value 
        ? 'bg-white text-primary shadow-sm' 
        : 'text-gray-600 hover:text-gray-800'"
    >
      {{ filter.label }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'FilterTabs',
  props: {
    activeFilter: {
      type: String,
      default: 'all'
    }
  },
  emits: ['filter-change'],
  data() {
    return {
      filters: [
        { value: 'all', label: 'All Items' },
        { value: 'veg', label: '🟢 Veg Only' },
        { value: 'non-veg', label: '🔴 Non-Veg Only' }
      ]
    }
  }
}
</script>