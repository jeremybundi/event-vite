// stores/auth.js
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: useLocalStorage('token', ''),
    user: useLocalStorage('user', null),
  }),
  actions: {
    setToken(token, user) {
      this.token = token;
      this.user = user;
      console.log('User set in store:', user);
      try {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user)); // Ensure user is stringified
      } catch (error) {
        console.error('Error setting items in localStorage:', error);
      }
    },
    getToken() {
      return this.token;
    },
    getUser() {
      try {
        return JSON.parse(localStorage.getItem('user')); // Ensure user is parsed correctly
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        return null;
      }
    },
    logout() {
      this.token = '';
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    userName: (state) => state.user?.first_name || '',
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'auth',
        storage: localStorage,
        paths: ['token', 'user'],
      }
    ]
  }
});
