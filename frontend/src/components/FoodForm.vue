<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" v-if="show">
    <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold">
          {{ isEdit ? 'Edit Food Item' : 'Add New Food Item' }}
        </h3>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input
            v-model="form.name"
            type="text"
            required
            class="input-field"
            placeholder="Enter food name"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea
            v-model="form.description"
            required
            rows="3"
            class="input-field"
            placeholder="Enter food description"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
          <input
            v-model="form.price"
            type="number"
            required
            min="0"
            step="0.01"
            class="input-field"
            placeholder="Enter price"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Category *</label>
          <select v-model="form.category" required class="input-field">
            <option value="">Select category</option>
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-Vegetarian</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Restaurant *</label>
          <input
            v-model="form.restaurant"
            type="text"
            required
            class="input-field"
            placeholder="Enter restaurant name"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            v-model="form.image"
            type="url"
            class="input-field"
            placeholder="Enter image URL"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Rating</label>
          <input
            v-model="form.rating"
            type="number"
            min="1"
            max="5"
            step="0.1"
            class="input-field"
            placeholder="Enter rating (1-5)"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Preparation Time</label>
          <input
            v-model="form.preparationTime"
            type="text"
            class="input-field"
            placeholder="e.g., 25 mins"
          />
        </div>

        <div class="flex space-x-3 pt-4">
          <button
            type="submit"
            :disabled="loading"
            class="btn-primary flex-1"
          >
            {{ loading ? 'Saving...' : (isEdit ? 'Update' : 'Add') }} Food Item
          </button>
          <button
            type="button"
            @click="$emit('close')"
            class="btn-secondary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FoodForm',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    food: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'submit'],
  data() {
    return {
      form: {
        name: '',
        description: '',
        price: '',
        category: '',
        restaurant: '',
        image: '',
        rating: '',
        preparationTime: ''
      }
    }
  },
  computed: {
    isEdit() {
      return !!this.food
    }
  },
  watch: {
    food: {
      handler(newFood) {
        if (newFood) {
          this.form = { ...newFood }
        } else {
          this.resetForm()
        }
      },
      immediate: true
    },
    show(newShow) {
      if (!newShow) {
        this.resetForm()
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', { ...this.form })
    },
    
    resetForm() {
      this.form = {
        name: '',
        description: '',
        price: '',
        category: '',
        restaurant: '',
        image: '',
        rating: '',
        preparationTime: ''
      }
    }
  }
}
</script>