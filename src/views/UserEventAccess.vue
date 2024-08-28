<template>
    <div class="p-8 max-w-md mx-auto bg-white rounded-xl shadow-lg space-y-6">
      <h1 class="text-3xl font-semibold text-gray-800">Manage User Event Access</h1>
  
      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div>
          <label for="user_id" class="block text-sm font-medium text-gray-700">User ID</label>
          <input
            v-model="formData.user_id"
            id="user_id"
            type="text"
            placeholder="Enter User ID"
            class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2"
            required
          />
        </div>
        <div>
          <label for="event_id" class="block text-sm font-medium text-gray-700">Event ID</label>
          <input
            v-model="formData.event_id"
            id="event_id"
            type="text"
            placeholder="Enter Event ID"
            class="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          class="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
        >
          Submit
        </button>
      </form>
  
      <div v-if="errorMessage" class="text-red-600 font-medium">
        <svg class="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3v6M11 15v2m0-6h.01M3 12a9 9 0 1118 0 9 9 0 01-18 0z"></path></svg>
        {{ errorMessage }}
      </div>
      <div v-if="successMessage" class="text-green-600 font-medium">
        <svg class="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        {{ successMessage }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  const formData = ref({
    user_id: '',
    event_id: ''
  });
  
  const errorMessage = ref('');
  const successMessage = ref('');
  
  const handleSubmit = async () => {
    errorMessage.value = '';
    successMessage.value = '';
  
    try {
      const response = await axios.post('/api/event/access/add', formData.value);
      
      if (response.data.status === 'success') {
        successMessage.value = response.data.message;
      } else {
        errorMessage.value = response.data.message;
      }
    } catch (error) {
      errorMessage.value = 'An unexpected error occurred.';
    }
  };
  </script>
  
  <style scoped>
  /* Add custom styles here */
  </style>
  