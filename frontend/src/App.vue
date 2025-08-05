<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <router-link to="/" class="text-2xl font-bold text-primary">
              Swiggy Clone
            </router-link>
          </div>
          <div class="flex space-x-4">
            <router-link 
              to="/" 
              class="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              :class="{ 'text-primary': $route.path === '/' }"
            >
              Home
            </router-link>
            <router-link 
              to="/admin" 
              class="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              :class="{ 'text-primary': $route.path === '/admin' }"
            >
              Admin Panel
            </router-link>
          </div>
        </div>
      </div>
    </nav>
    
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>