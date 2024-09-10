<template>
  <Header></Header>

  <div class="p-8 max-w-md mx-auto bg-white rounded-xl shadow-xl space-y-6">
    <h1 class="text-3xl font-semibold text-gray-900">
      Manage User Event Access
    </h1>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label for="user_id" class="block text-sm font-medium text-gray-700">
          User ID
        </label>
        <input
          v-model="formData.user_id"
          id="user_id"
          type="text"
          placeholder="Enter User ID"
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
          required
        />
      </div>

      <div>
        <label for="event_id" class="block text-sm font-medium text-gray-700">
          Event ID
        </label>
        <input
          v-model="formData.event_id"
          id="event_id"
          type="text"
          placeholder="Enter Event ID"
          class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
          required
        />
      </div>

      <button
        type="submit"
        class="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
      >
        Submit
      </button>
    </form>

    <div v-if="errorMessage" class="text-red-600 font-medium flex items-center mt-4">
      <svg class="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3v6M11 15v2m0-6h.01M3 12a9 9 0 1118 0 9 9 0 01-18 0z"></path>
      </svg>
      {{ errorMessage }}
    </div>

    <div v-if="successMessage" class="text-green-600 font-medium flex items-center mt-4">
      <svg class="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      {{ successMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Header from './Header.vue';
import { useAuthStore } from '../stores/auth'; 

const formData = ref({
  user_id: '',
  event_id: '',
});

const errorMessage = ref('');
const successMessage = ref('');

const authStore = useAuthStore(); 

const handleSubmit = async () => {
  errorMessage.value = '';
  successMessage.value = '';

  try {
    const token = authStore.token; 

    const response = await axios.post(
      '/api/event/access/add', 
      formData.value,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    if (response.data.status === 'success') {
      successMessage.value = response.data.message;
      console.log('Access granted to the user', response.data.message)
       // Clear the form fields after successful submission
       formData.value = {
        user_id: '',
        event_id: '',
      };
    } else {
      errorMessage.value = response.data.message;
      console.log('access not granted', response.data.message)


    }
  } catch (error) {
    errorMessage.value = 'An unexpected error occurred.';
  }
};
</script>

<style scoped>
/* Scoped styles if needed */
</style>
