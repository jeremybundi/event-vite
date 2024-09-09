<template>
  <header
    class="bg-gradient-to-r from-indigo-600 to-lime-500 text-white p-4 shadow-md"
  >
    <div
      class="container mx-auto flex flex-col sm:flex-row items-center justify-between"
    >
      <!-- Home Button and Logo on the left -->
      <div class="flex items-center space-x-4 mb-4 sm:mb-0">
        <img src="../assets/logo.jpg" alt="Logo" class="h-12 w-auto" />
        <router-link to="/">
          <button class="text-white text-lg font-semibold hover:underline">
            Home
          </button>
        </router-link>
        <button
          v-if="isAuthenticated"
          @click="goToDashboard"
          class="text-white text-lg font-semibold hover:underline"
        >
          Dashboard
        </button>
      </div>

      <!-- Legacy Events in the middle -->
      <div class="flex-1 text-center mb-4 sm:mb-0">
        <h1 class="text-2xl font-bold font-serif">Legacy Events</h1>
      </div>

      <!-- Navigation and user info on the right -->
      <div class="flex items-center space-x-4">
        <div v-if="isAuthenticated" class="flex items-center space-x-4">
          <span class="text-lg font-bold text-white"
            >Welcome, {{ userName }}!</span
          >
          <button
            @click="logout"
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        <div v-else class="flex space-x-4">
          <div class="relative">
            <button
              @click="toggleDropdown"
              class="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200"
            >
              Login
            </button>
            <div
              v-if="dropdownOpen"
              class="absolute right-0 mt-2 w-48 bg-white text-black border border-gray-200 rounded-md shadow-lg"
            >
              <router-link to="/customerlogin">
                <button
                  @click="closeDropdown"
                  class="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Login as Customer
                </button>
              </router-link>
              <router-link to="/login">
                <button
                  @click="closeDropdown"
                  class="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Login as Admin
                </button>
              </router-link>
            </div>
          </div>
          <router-link to="/signup">
            <button
              class="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200"
            >
              Signup
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

export default {
  name: 'Header',
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const dropdownOpen = ref(false);

    const isAuthenticated = computed(() => authStore.isAuthenticated);
    const userName = computed(() => authStore.userName);

    const logout = () => {
      authStore.logout();
      router.push('/');
    };

    const goToDashboard = () => {
      const role = authStore.userRole;

      switch (role) {
        case 'Super Admin':
        case 'System Admin':
          router.push({ name: 'admindashboard' });
          break;
        case 'Event Organizers':
          router.push({ name: 'organizersdashboard' });
          break;
        case 'Validator':
          router.push({ name: 'validatordashboard' });
          break;
        default:
          router.push({ name: 'main' });
          break;
      }
    };

    const toggleDropdown = () => {
      dropdownOpen.value = !dropdownOpen.value;
    };

    const closeDropdown = () => {
      dropdownOpen.value = false;
    };

    return {
      isAuthenticated,
      userName,
      logout,
      goToDashboard,
      toggleDropdown,
      closeDropdown,
      dropdownOpen,
    };
  },
};
</script>

<style scoped>
/* Optional: Add additional styles here if needed */
</style>
