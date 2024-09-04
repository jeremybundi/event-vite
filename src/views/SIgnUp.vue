<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
      <div class="w-full max-w-xl bg-white rounded-lg shadow-lg p-6 space-y-6">
        <!-- Registration Form -->
        <div v-if="!otpSent">
          <h2 class="text-2xl font-bold text-gray-800 text-center mb-4">Register</h2>
  
          <form @submit.prevent="registerUser">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="mb-4">
                <label for="first_name" class="block text-gray-700">First Name</label>
                <input type="text" v-model="user.first_name" id="first_name" class="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
  
              <div class="mb-4">
                <label for="second_name" class="block text-gray-700">Second Name</label>
                <input type="text" v-model="user.second_name" id="second_name" class="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
  
              <div class="mb-4">
                <label for="username" class="block text-gray-700">Username</label>
                <input type="text" v-model="user.username" id="username" class="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
  
              <div class="mb-4">
                <label for="email" class="block text-gray-700">Email</label>
                <input type="email" v-model="user.email" id="email" class="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
  
              <div class="mb-4">
                <label for="password" class="block text-gray-700">Password</label>
                <input type="password" v-model="user.password" id="password" class="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
  
              <div class="mb-4">
                <label for="phone" class="block text-gray-700">Phone</label>
                <input type="text" v-model="user.phone" id="phone" class="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
            </div>
  
            <button type="submit" class="w-full bg-lime-900 text-white py-3 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-lg font-semibold mt-4">
              Register
            </button>
          </form>
        </div>
  
        <!-- OTP Verification -->
        <div v-else>
          <h2 class="text-2xl font-bold text-gray-800 text-center mb-4">Verify OTP</h2>
          <p class="text-center text-gray-600 mb-6">Enter the OTP sent to your phone and email</p>
  
          <form @submit.prevent="verifyOtp">
            <div class="mb-4">
              <label for="otp" class="block text-gray-700">OTP</label>
              <input type="text" v-model="otp" id="otp" class="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
  
            <button type="submit" class="w-full bg-green-600 text-white py-3 px-4 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-lg font-semibold">
              Verify OTP
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: {
          first_name: '',
          second_name: '',
          username: '',
          email: '',
          password: '',
          phone: ''
        },
        otp: '',
        otpSent: false
      };
    },
    methods: {
      async registerUser() {
        try {
          const response = await axios.post('/api/user/create', this.user);
          this.otpSent = true;
          alert('OTP has been sent to your phone and email');
        } catch (error) {
          console.error('Error registering user:', error);
          alert('Registration failed. Please try again.');
        }
      },
      async verifyOtp() {
        try {
          const response = await axios.post('/api/user/verify/otp', { username: this.user.username, otp: this.otp });
          alert('OTP verified successfully!');
          // Redirect or perform further actions after successful verification
        } catch (error) {
          console.error('Error verifying OTP:', error);
          alert('Invalid OTP. Please try again.');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Additional styles if needed */
  </style>
  