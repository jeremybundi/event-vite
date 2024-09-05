<template>
        <Header></Header>

    <div class="max-w-lg mx-auto mt-8 mb-8 bg-white shadow-lg rounded-lg overflow-hidden">
      <div class="bg-gradient-to-r  from-indigo-800 to-lime-800 p-4">
        <h2 class="text-3xl font-bold text-white">Update User Role</h2>
        <p class="text-blue-200">Manage user roles easily and efficiently.</p>
      </div>
  
      <div class="p-6">
        <div v-if="message" :class="messageClass">
          <p class="font-semibold">{{ message.text }}</p>
        </div>
  
        <form @submit.prevent="updateRole" class="space-y-6">
          <div>
            <label for="userId" class="block text-sm font-medium text-gray-700">User ID</label>
            <input 
              type="text" 
              v-model="userId" 
              id="userId" 
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter User ID"
              required
            >
          </div>
  
          <div>
            <label for="roleId" class="block text-sm font-medium text-gray-700">Role</label>
            <select 
              v-model="roleId" 
              id="roleId" 
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="5">Super Admin</option>
              <option value="3">System Admin</option>
              <option value="2">Event Organizer</option>
              <option value="4">Validator</option>
            </select>
          </div>
  
          <div class="flex justify-end">
            <button 
              type="submit" 
              class="px-6 py-2 bg-lime-800 text-white rounded-md shadow-sm transition-colors hover:bg-indigo-700"
            >
              Update Role
            </button>
          </div>
        </form>
      </div>
  
      <div class="bg-gray-50 p-4">
        <p class="text-gray-600 text-sm">
          Logged in as <strong>{{ authStore.userName }}</strong>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { useAuthStore } from '../stores/auth';
  import Header from './Header.vue'
  
  export default {
    components:{
      Header,
    },
    data() {
      return {
        userId: '',
        roleId: '',
        message: null,
      };
    },
    setup() {
      const authStore = useAuthStore();
  
      return { authStore };
    },
    computed: {
      messageClass() {
        return this.message?.status === 'success'
          ? 'bg-green-100 text-green-700 p-4 rounded-md mb-4'
          : 'bg-red-100 text-red-700 p-4 rounded-md mb-4';
      },
    },
    methods: {
      async updateRole() {
        try {
          const token = this.authStore.getToken();
          const response = await axios.put(
            `/api/roles/updateRoleByUserId/${this.userId}`,
            {
              role_id: this.roleId,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          this.message = {
            status: 'success',
            text: response.data.message,
          };
  
          // Clear form fields after successful update
          this.userId = '';
          this.roleId = '';
        } catch (error) {
          this.message = {
            status: 'error',
            text: error.response?.data?.message || 'Failed to update role',
          };
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Additional styles if needed */
  </style>
  