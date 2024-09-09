import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    token: useLocalStorage('auth-token', ''),
    email: useLocalStorage('email', ''), // Initialize as an empty string
  }),
  actions: {
    setToken(token) {
      this.token = token;
    },
    setEmail(email) {
      this.email = email;
    },
    logout() {
      this.token = '';
      this.email = ''; // Clear the email on logout
      localStorage.removeItem('auth-token');
      localStorage.removeItem('email'); // Remove email from local storage
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'auth-store',
        storage: localStorage,
        paths: ['token', 'email'], // Ensure both token and email are stored
      },
    ],
  },
});
