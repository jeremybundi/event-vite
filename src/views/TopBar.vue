<template>
    <div class="bg-gradient-to-r from-gray-600 via-gray-700 to-black p-4 flex flex-col sm:flex-row justify-between items-center shadow-md rounded-lg mb-6">
      <img src="../assets/logo.jpg" alt="Logo" class="h-12 sm:h-16 w-auto mb-2 sm:mb-0" />
      
       <button @click="goToHome" class="text-white px-4 py-2 border-transparent hover:border-b-2 hover:border-white transition-all duration-300 mb-2 sm:mb-0">
          Home
        </button>
  
        <button @click="goToDashboard" class="text-white px-4 py-2 border-transparent hover:border-b-2 hover:border-white transition-all duration-300 mb-2 sm:mb-0">
          Dashboard
        </button>
  
      <div class="flex flex-col sm:flex-row items-center sm:space-x-4 mx-auto mb-2 sm:mb-0">
       
  
        <span class="text-white text-xl font-bold">
          Legacy Events
        </span>
      </div>
  
      <div class="flex flex-col sm:flex-row items-center space-x-4">
        <span class="text-white text-sm mb-2 sm:mb-0">Logged in as: <strong>{{ userStore.email }}</strong></span>
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
        router.push('/main');
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
  
  <style scoped>
  /* Styling for the top bar */
  img {
    max-height: 40px;
  }
  
  @media (min-width: 640px) {
    img {
      max-height: 64px; 
    }
  }
  
  /* Styling for navigation buttons */
  button {
    border: 2px solid transparent;
  }
  
  button:hover {
    border-color: transparent; 
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
  