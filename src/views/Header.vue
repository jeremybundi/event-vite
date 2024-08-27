<template>
  <header class="bg-gray-900 text-white p-4 shadow-md">
    <div class="container mx-auto flex items-center justify-between">
      <!-- Logo on the left -->
      <div class="flex items-center space-x-4">
        <img src="../assets/logo.jpg" alt="Logo" class="h-12 w-auto" />
        <h1 class="text-xl font-bold font-serif">Legacy Events</h1>
      </div>
      <!-- Navigation and user info on the right -->
      <div class="flex items-center space-x-4">
        <div v-if="isAuthenticated" class="flex items-center space-x-4">
          <span class="text-lg">Welcome, {{ userName }}!</span>
          <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
        </div>
        <div v-else class="flex space-x-4">
          <router-link to="/login">
            <button class="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200">Login</button>
          </router-link>
          <router-link to="/signup">
            <button class="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200">Signup</button>
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { useAuthStore } from '../stores/auth';
import { computed } from 'vue';

export default {
  name: 'Header',
  setup() {
    const authStore = useAuthStore();

    const isAuthenticated = computed(() => authStore.isAuthenticated);
    const userName = computed(() => {
      const name = authStore.userName;
      console.log('UserName from store:', name); // Log userName
      return name;
    });

    const logout = () => {
      authStore.logout();
    };

    return {
      isAuthenticated,
      userName,
      logout,
    };
  },
};
</script>

<style scoped>
/* Optional: Add additional styles here if needed */
</style>
