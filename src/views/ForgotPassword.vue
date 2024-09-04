<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="p-8 bg-white rounded-lg shadow-lg w-96">
        <h2 class="mb-6 text-2xl font-bold text-center text-gray-800">Forgot Password</h2>
        
        <!-- Step 1: Enter Username -->
        <div v-if="step === 1">
          <input
            v-model="username"
            type="text"
            placeholder="Enter Username"
            class="w-full px-4 py-2 mb-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            @click="handleSendOtp"
            class="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send OTP
          </button>
        </div>
        
        <!-- Step 2: Enter OTP and New Password -->
        <div v-else>
          <input
            v-model="otp"
            type="text"
            placeholder="Enter OTP"
            class="w-full px-4 py-2 mb-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            v-model="newPassword"
            type="password"
            placeholder="Enter New Password"
            class="w-full px-4 py-2 mb-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            @click="handleResetPassword"
            class="w-full px-4 py-2 font-semibold text-white bg-lime-900 rounded-lg hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        username: '',
        otp: '',
        newPassword: '',
        step: 1,
      };
    },
    methods: {
      async handleSendOtp() {
        try {
          const response = await axios.post('/api/forgot/password/otp', {
            username: this.username,
          });
          if (response.data.success) {
            this.step = 2;
            //console.log('otp sent')
          } else {
            console.log('Failed to send OTP:', response.data.message || 'Unknown error');
          }
        } catch (error) {
          console.error('Error sending OTP:', error);
        }
      },
      async handleResetPassword() {
        try {
          const response = await axios.post('/api/reset/password', {
            username: this.username,
            otp: this.otp,
            newPassword: this.newPassword,
          });
          if (response.data.success) {
            console.log('Password reset successfully!');
          } else {
            console.log('Failed to reset password:', response.data.message || 'Unknown error');
          }
        } catch (error) {
          console.error('Error resetting password:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Additional custom styling can be added here if needed */
  </style>
  