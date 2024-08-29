<template>
    <div class="min-h-screen bg-gray-100 p-6">
      <div class="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <!-- Header -->
        <div class="bg-blue-600 p-6">
          <h2 class="text-3xl font-bold text-white">Validator Dashboard</h2>
          <p class="text-blue-200">Ensure ticket authenticity with ease</p>
        </div>
  
        <!-- Validate Tickets Button -->
        <div class="p-6 flex justify-center">
          <button @click="navigateTo('adminvalidate')" class="dashboard-button bg-purple-500 hover:bg-purple-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M7 12V7h2v10H7v-5H5v5a2 2 0 002 2h10a2 2 0 002-2v-5h-2v5h-2V7h2v10H9v-5h2v5H9V7H7v5z" />
            </svg>
            Validate Tickets
          </button>
          
        </div>
           <!-- Redeem Tickets Button -->
        <div class="p-6 flex justify-center">
        
        <button @click="navigateTo('redeem')" class="dashboard-button bg-pink-500 hover:bg-pink-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7V4a1 1 0 00-1-1H9a1 1 0 00-1 1v3H5a1 1 0 00-1 1v3h16V8a1 1 0 00-1-1h-3zM4 12v4a1 1 0 001 1h2m10 0h2a1 1 0 001-1v-4M8 21h8M12 16v5" />
          </svg>
          Redeem Tickets
        </button>
        </div>
  
        <!-- Footer -->
        <div class="bg-gray-50 p-4 text-center">
          <p class="text-gray-600 text-sm">
            Logged in as <strong>{{ authStore.userName }}</strong>
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from '../stores/auth';
  
  export default {
    setup() {
      const authStore = useAuthStore();
  
      return { authStore };
    },
    methods: {
      navigateTo(routeName) {
        this.$router.push({ name: routeName });
      },
    },
  };
  </script>
  
  <style scoped>
  .dashboard-button {
    @apply w-full text-white font-bold py-4 px-6 rounded-md shadow-lg transition-colors duration-300;
  }
  </style>
  