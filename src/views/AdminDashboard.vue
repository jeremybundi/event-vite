<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <!-- Header -->
      <div class="bg-blue-800 p-6">
        <h2 class="text-4xl font-bold text-white">Admin Dashboard</h2>
        <p class="text-blue-200">Manage and oversee all event-related activities</p>
      </div>

      <!-- Dashboard Buttons -->
      <div class="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

        <!-- Update Roles Button -->
        <button @click="navigateTo('roles')" class="dashboard-button bg-blue-500 hover:bg-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3l4 4m0 4H3m18 4h-5m1 4h-4m1 4h-5m1 4H3" />
          </svg>
          Update Roles
        </button>

        <!-- View Event Summary Button -->
        <button @click="navigateTo('summary')" class="dashboard-button bg-purple-500 hover:bg-purple-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h16v16H4z" />
          </svg>
          View Events Summary
        </button>

        <!-- Admin Validate Button -->
        <button @click="navigateTo('adminvalidate')" class="dashboard-button bg-red-500 hover:bg-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7v14" />
          </svg>
          Validate Tickets
        </button>

        <!-- Admin View Button -->
        <button @click="navigateTo('adminview')" class="dashboard-button bg-indigo-500 hover:bg-indigo-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5h16M4 10h16m-7 4h7M4 15h7M4 20h7m-7-5h3" />
          </svg>
          Booked & Purchased Tickets
        </button>

        <!-- User Event Access Button -->
        <button @click="navigateTo('UserEvent')" class="dashboard-button bg-teal-500 hover:bg-teal-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m-8-8h16" />
          </svg>
          Add Access To Users
        </button>

        <!-- Analysis Button -->
        <button @click="navigateTo('analysis')" class="dashboard-button bg-orange-500 hover:bg-orange-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2H3v2h6zm0-4v-2H3v2h6zm0-4V7H3v2h6zm9 10h4v2h-4zm0-4h4v2h-4zm0-4h4v2h-4zm0-4h4V7h-4zm0 14H3a1 1 0 01-1-1v-2a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1zm0-8h-6a1 1 0 010-2h6a1 1 0 110 2z" />
          </svg>
          Event Analysis 
        </button>

        <!-- Redeem Tickets Button -->
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
