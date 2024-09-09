<template>
  <div class="flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md p-8 mt-20 mb-20 bg-white shadow-md rounded-lg">
      <h2 class="text-2xl font-semibold mb-4 text-center">Login</h2>
      <form v-if="!otpSent" @submit.prevent="sendOtp">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            id="email"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          class="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700"
        >
          Send OTP
        </button>
      </form>

      <form v-if="otpSent" @submit.prevent="verifyOtp" class="mt-6">
        <div class="mb-4">
          <label for="otp" class="block text-sm font-medium text-gray-700"
            >OTP</label
          >
          <input
            v-model="otp"
            type="text"
            id="otp"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          class="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700"
        >
          Verify OTP
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'; // Import useRouter
import { useAuthStore } from '../stores/userStore'; // Ensure the correct path to userStore.js

const email = ref('');
const otp = ref('');
const otpSent = ref(false);

const router = useRouter(); // Create an instance of the router
const userStore = useAuthStore(); // Create an instance of the user store

const sendOtp = async () => {
  try {
    const response = await axios.post('/api/customer/login/sendotp', {
      email: email.value,
    });
    if (response.data.status === 'success') {
      otpSent.value = true;
    } else {
      alert(response.data.message);
    }
  } catch (error) {
    console.error('sendOtp error:', error);
  }
};

const verifyOtp = async () => {
  try {
    const response = await axios.post('/api/customer/login/verifyotp', {
      email: email.value,
      otp: otp.value,
    });
    if (response.data.status === 'success') {
      // Store the token only in the Pinia store
      userStore.setToken(response.data.token);
      userStore.setEmail(response.data.email);
      console.log(response.data.email);

      // Redirect to the customer dashboard
      router.push('/customerdashboard');
    } else {
      console.log('API Error:', response.data.message);
    }
  } catch (error) {
    console.error('verifyOtp error:', error);
  }
};
</script>
