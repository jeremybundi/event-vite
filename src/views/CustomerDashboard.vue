<template>
  <div class="min-h-screen bg-gray-100 p-6">
    
    <TopBar />

    <div class="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <!-- Header -->
      <div class="bg-green-600  p-6">
        <h2 class="text-3xl font-bold text-white">Customer Dashboard</h2>
        <p class="text-green-200">Manage your event tickets with ease</p>
      </div>

      <!-- Buttons -->
      <div class="p-6 grid grid-cols-1 gap-4">
        <button @click="navigateTo('GetAll')" class="dashboard-button bg-blue-500 hover:bg-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11h4m-2-2v4m4-1a9 9 0 110-4 4 4 0 110 8 9 9 0 110-8m-1 5a9 9 0 010 0m0-2a9 9 0 010 0" />
          </svg>
          View Ticket History
        </button>

        <button @click="navigateTo('GetPaid')" class="dashboard-button bg-teal-500 hover:bg-teal-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 11v2m0-2a5 5 0 100 4 5 5 0 110-8m0 2a7 7 0 110 0" />
          </svg>
          View Paid Tickets
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/userStore';
import TopBar from './TopBar.vue'; // Import TopBar component

export default {
  components: {
    TopBar, // Register TopBar component
  },
  setup() {
    const authStore = useAuthStore();

    return { authStore };
  },
  methods: {
    navigateTo(routeName) {
      this.$router.push({ name: routeName });
    },
    logout() {
      const authStore = useAuthStore();
      authStore.logout();
      this.$router.push({ name: 'main' }); // Redirect to login page after logout
    }
  }
};
</script>

<style scoped>
.dashboard-button {
  @apply w-full text-white font-bold py-4 px-6 rounded-md shadow-lg transition-colors duration-300;
}
</style>
