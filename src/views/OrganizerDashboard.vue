<template>

        <Header></Header>

    <div class="min-h-screen bg-gray-100 p-6">
      <div class="max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <!-- Header -->
        <div class="bg-blue-500 p-6">
          <h2 class="text-3xl font-bold text-white">Event Organizer Dashboard</h2>
          <p class="text-blue-200">Manage your events efficiently</p>
        </div>
  
        <!-- Dashboard Buttons -->
        <div class="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <!-- Add Event Button -->
          <button @click="navigateTo('Add')" class="dashboard-button bg-green-500 hover:bg-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Event
          </button>
  
          <!-- Edit Event Button -->
          <button @click="navigateTo('List')" class="dashboard-button bg-yellow-500 hover:bg-yellow-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3a1 1 0 00-1 1v16a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2zm5 8a1 1 0 000 2h3a1 1 0 100-2h-3zm0 4a1 1 0 000 2h2a1 1 0 000-2h-2zm0 4a1 1 0 100 2h2a1 1 0 000-2h-2z" />
            </svg>
            Edit Event
          </button>
  
          <!-- Validate Tickets Button -->
          <button @click="navigateTo('adminvalidate')" class="dashboard-button bg-purple-500 hover:bg-purple-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M7 12V7h2v10H7v-5H5v5a2 2 0 002 2h10a2 2 0 002-2v-5h-2v5h-2V7h2v10H9v-5h2v5H9V7H7v5z" />
            </svg>
            Validate Tickets
          </button>
           
          <!-- Redeem Tickets Button -->
          <button @click="navigateTo('redeem')" class="dashboard-button bg-pink-500 hover:bg-pink-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7V4a1 1 0 00-1-1H9a1 1 0 00-1 1v3H5a1 1 0 00-1 1v3h16V8a1 1 0 00-1-1h-3zM4 12v4a1 1 0 001 1h2m10 0h2a1 1 0 001-1v-4M8 21h8M12 16v5" />
          </svg>
          Redeem Tickets
        </button>
  
          <!-- View Summary Button -->
          <button @click="navigateTo('summary')" class="dashboard-button bg-indigo-500 hover:bg-indigo-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h16v16H4z" />
            </svg>
            View Summary
          </button>

          <!-- User Event Access Button
          <button @click="navigateTo('UserEvent')" class="dashboard-button bg-teal-500 hover:bg-teal-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m-8-8h16" />
            </svg>
            User Event Access
          </button -->
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
  import Header from './Header.vue'
  
  export default {
    components:{
      Header,
    },
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
  