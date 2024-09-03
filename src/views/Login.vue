<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-6">
      <!-- Login Form -->
      <div v-if="!otpSent">
        <h2 class="text-2xl font-bold text-gray-800 text-center mb-4">Login</h2>

        <form @submit.prevent="loginUser">
          <div class="mb-4">
            <label for="username" class="block text-gray-700">Username</label>
            <input type="text" v-model="loginDetails.username" id="username" class="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>

          <div class="mb-4">
            <label for="password" class="block text-gray-700">Password</label>
            <input type="password" v-model="loginDetails.password" id="password" class="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>

          <button type="submit" class="w-full bg-blue-600 text-white py-3 px-4 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-lg font-semibold mt-4">
            Login
          </button>
        </form>

        <!-- Forgot Password Link -->
        <div class="mt-4 text-center">
          <router-link to="/forgot" class="text-blue-500 hover:underline">Forgot Password?</router-link>
        </div>
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
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const loginDetails = ref({
      username: '',
      password: ''
    });
    const otp = ref('');
    const otpSent = ref(false);

    const loginUser = async () => {
      try {
        await axios.post('/api/login', loginDetails.value);
        otpSent.value = true;
        console.log('OTP has been sent to your phone and email');
      } catch (error) {
        console.error('Error logging in:', error);
        console.log('Login failed. Please check your credentials.');
      }
    };

    const verifyOtp = async () => {
      try {
        const response = await axios.post('/api/verify/otp', { username: loginDetails.value.username, otp: otp.value });
        console.log('Login response:', response.data);

        const userData = {
          token: response.data.token,
          first_name: response.data.first_name,
          role: response.data.role,
        };

        authStore.setToken(userData.token, userData);

        console.log('User data:', userData);

        // Redirect based on user role
        switch (userData.role) {
          case 'System Admin':
          case 'Super Admin':
            router.push('/admindashboard');
            break;
          case 'Event Organizers':
            router.push('/organizersdashboard');
            break;
          case 'Validator':
            router.push('/validatordashboard');
            break;
          case 'Customer':
            router.push('/customerdashboard');
            break;
          default:
            router.push('/');
            break;
        }
      } catch (error) {
        console.error('Error verifying OTP:', error);
        alert('Invalid OTP. Please try again.');
      }
    };

    return { loginDetails, otp, otpSent, loginUser, verifyOtp };
  }
};
</script>
