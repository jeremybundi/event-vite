// stores/userStore.js
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    token: useLocalStorage('auth-token', ''),
  }),
  actions: {
    setToken(token) {
      this.token = token;
    },
    logout() {
      this.token = '';
      localStorage.removeItem('auth-token');
    },
  },
});
