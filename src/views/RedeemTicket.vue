<template>
  <div class="flex items-center justify-center h-2/4 bg-gray-100 p-4">
    <div class="w-full max-w-sm bg-white shadow-lg rounded-lg p-6">
      <h2 class="text-2xl font-bold mb-4 text-center text-gray-800">Redeem Your Ticket</h2>
      
      <form @submit.prevent="redeemTicket" class="space-y-4">
        <div>
          <label for="unique_code" class="block text-gray-700 font-medium mb-2">Unique Code</label>
          <input
            v-model="uniqueCode"
            id="unique_code"
            type="text"
            placeholder="Enter unique code"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p v-if="errorMessage" class="text-red-500 mt-2 text-sm">{{ errorMessage }}</p>
        </div>
        
        <button
          type="submit"
          class="w-full bg-lime-700 text-white py-2 px-4 rounded-lg hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Redeem Ticket
        </button>
        
        <p v-if="successMessage" class="text-green-500 mt-4 text-center text-sm">{{ successMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../stores/auth'

const uniqueCode = ref('')
const errorMessage = ref('')
const successMessage = ref('')

const authStore = useAuthStore()

const redeemTicket = async () => {
  // Reset messages
  errorMessage.value = ''
  successMessage.value = ''
  
  // Validate input
  if (!uniqueCode.value.trim()) {
    errorMessage.value = 'Unique code is required.'
    return
  }

  try {
    // Send the redeem request to the API
    const response = await axios.post(
      '/api/redeem/ticket/' + uniqueCode.value,
      {},
      {
        headers: {
          'Authorization': `Bearer ${authStore.token}`,
        },
      }
    )

    // Handle different API responses based on your backend logic
    if (response.data.status === 'success') {
      successMessage.value = response.data.message || 'Ticket redeemed successfully.'
    } else {
      // Display the error message returned by the API
      errorMessage.value = response.data.message || 'An error occurred.'
    }
  } catch (error) {
    // Handle error response from the server
    if (error.response && error.response.data) {
      errorMessage.value = error.response.data.message || 'An error occurred.'
    } else {
      errorMessage.value = 'An error occurred.'
    }
  }

  // Clear the unique code after handling both success and error cases
  uniqueCode.value = ''
}
</script>

<style scoped>
/* Adjust container and margin styles if necessary */
</style>
