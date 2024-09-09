// stores/auth.js
import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: useLocalStorage('token', ''),
    user: useLocalStorage('user', '{}'),
  }),
  actions: {
    setToken(token, user) {
      this.token = token;
      this.user = JSON.stringify(user);
      //console.log('User set in store:', user);
      try {
        localStorage.setItem('token', token);
        localStorage.setItem('user', this.user);
      } catch (error) {
        console.error('Error setting items in localStorage:', error);
      }
    },
    getToken() {
      return this.token;
    },
    getUser() {
      try {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : {};
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        return {};
      }
    },
    logout() {
      this.token = '';
      this.user = '{}';
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    userName: (state) => {
      try {
        const user = JSON.parse(state.user);
        return user.first_name || '';
      } catch (error) {
        console.error('Error parsing user data in getter:', error);
        return '';
      }
    },
    userRole: (state) => {
      try {
        const user = JSON.parse(state.user);
        return user.role || '';
      } catch (error) {
        console.error('Error parsing user role in getter:', error);
        return '';
      }
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'auth',
        storage: localStorage,
        paths: ['token', 'user'],
      },
    ],
  },
});
