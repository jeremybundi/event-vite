<template>
    <div class="bg-gradient-to-r from-gray-600 via-gray-700 to-black p-4 flex justify-between items-center shadow-md rounded-lg mb-6">
      <!-- Logo on the left -->
      <img src="../assets/logo.jpg" alt="Logo" class="h-16 w-auto" />
       <!-- Home Button -->
       <button @click="goToHome" class="text-white px-4 py-2 border-transparent hover:border-b-2 hover:border-white transition-all duration-300">
          Home
        </button>
  
        <!-- Dashboard Button -->
        <button @click="goToDashboard" class="text-white px-4 py-2 border-transparent hover:border-b-2 hover:border-white transition-all duration-300">
          Dashboard
        </button>
  
      <!-- Navigation Buttons and Legacy Events centered text -->
      <div class="flex items-center space-x-4 mx-auto">
       
  
        <!-- Legacy Events centered text -->
        <span class="text-white text-xl font-bold mx-4">
          Legacy Events
        </span>
      </div>
  
      <!-- Logged in as and Logout button on the right -->
      <div class="flex items-center space-x-4">
        <span class="text-white">Logged in as: <strong>{{ userStore.email }}</strong></span>
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
  import { useAuthStore } from '../stores/userStore'; // Import the Pinia store
  import { useRouter } from 'vue-router'; // Import the Vue Router
  
  export default {
    setup() {
      const userStore = useAuthStore(); // Get access to the Pinia store
      const router = useRouter(); // For navigation
  
      // Logout function
      const logout = () => {
        userStore.logout(); // Clear token and user details from the store
        router.push('/main'); // Redirect to the login page after logout
      };
  
      // Navigate to Home function
      const goToHome = () => {
        router.push('/'); // Navigate to the home page
      };
  
      // Navigate to Dashboard function
      const goToDashboard = () => {
        router.push('/customerdashboard'); // Navigate to the customer dashboard
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
  
  <style scoped>
  /* Styling for the top bar */
  img {
    max-height: 40px;
  }
  
  /* Styling for navigation buttons */
  button {
    border: 2px solid transparent;
  }
  
  button:hover {
    border-color: transparent; /* Keep border transparent to show underline */
  }
  
  button:hover::after {
    content: "";
    display: block;
    width: 100%;
    height: 2px;
    background-color: white;
    position: relative;
    top: 100%;
  }
  
  .bg-gradient-to-r {
    background: linear-gradient(to right, #1f1f1f, #2d2d2d, #3d3d3d);
  }
  
  .text-white {
    color: #ffffff;
  }
  </style>
  