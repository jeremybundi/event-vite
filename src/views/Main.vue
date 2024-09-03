<template>
    <div class="space-y-6"> 
        <!-- Top Right Corner Link -->
    <div class="absolute top-21 right-8">
      <router-link to="/customerlogin" class="text-red-600 hover:text-blue-800 flex items-center">
        <i class="fas fa-eye text-xl"></i>
        <span class="ml-2">View Tickets</span>
      </router-link>
    </div>
   
    <div class="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
 
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';

  import EventCard from './EventCard.vue';


  
  const events = ref([]);
  const router = useRouter();
  
  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/event/get/public'); 
      if (response.data.status === 'success') {
        events.value = Object.values(response.data.data); 
        console.log(response.data.data)
      } else {
        console.error('Error fetching events:', response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  onMounted(() => {
    fetchEvents();
  });
  </script>
  
  <style scoped>
  /* Add any specific styling for the page here */
  </style>
  