<template>
  <div
    class="bg-gradient-to-r from-gray-600 via-gray-700 to-black p-4 flex flex-col sm:flex-row justify-between items-center shadow-md rounded-lg mb-6"
  >
    <!-- Logo -->
    <img
      src="../assets/logo.jpg"
      alt="Logo"
      class="h-12 sm:h-16 w-auto mb-2 sm:mb-0"
    />

    <!-- Navigation Buttons -->
    <div class="flex flex-col sm:flex-row items-center space-x-4 mb-2 sm:mb-0">
      <button
        @click="goToHome"
        class="text-white px-4 py-2 border-transparent hover:border-b-2 hover:border-white transition-all duration-300"
      >
        Home
      </button>

      <button
        @click="goToDashboard"
        class="text-white px-4 py-2 border-transparent hover:border-b-2 hover:border-white transition-all duration-300"
      >
        Dashboard
      </button>
    </div>

    <!-- Legacy Events Title -->
    <div
      class="flex flex-col sm:flex-row items-center sm:space-x-4 mb-2 sm:mb-0 mx-auto"
    >
      <span class="text-white text-xl font-bold"> Legacy Events </span>
    </div>

    <!-- User Info and Logout -->
    <div class="flex flex-col sm:flex-row items-center space-x-4">
      <span class="text-white text-sm mb-2 sm:mb-0"
        >Logged in as: <strong>{{ userStore.email }}</strong></span
      >
      <button
        @click="logout"
        class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm"
      >
        Logout
      </button>
    </div>
  </div>
</template>
<script>
import { useAuthStore } from '../stores/userStore';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const userStore = useAuthStore();
    const router = useRouter();

    // Logout function
    const logout = () => {
      userStore.logout();
      router.push('/');
    };

    // Navigate to Home function
    const goToHome = () => {
      router.push('/');
    };

    // Navigate to Dashboard function
    const goToDashboard = () => {
      router.push('/customerdashboard');
    };

    return {
      userStore,
      logout,
      goToHome,
      goToDashboard,
    };
  },
};
</script>
