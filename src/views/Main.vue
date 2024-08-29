<template>
    <div class="space-y-6"> <!-- Container for vertical spacing between components -->
    <!-- Slideshow component at the top -->
    <!-- <div class="mt-2">
    <Slideshow />
  </div> -->
    <div class="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- EventCard component for each event -->
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  // Define EventCard as a local component
  import EventCard from './EventCard.vue';
 // import Slideshow from './SlideShow.vue'; // Make sure the path is correct

  
  const events = ref([]);
  const router = useRouter();
  
  const fetchEvents = async () => {
    try {
      const response = await axios.get('/api/event/get/public'); // Adjust the API endpoint as needed
      if (response.data.status === 'success') {
        events.value = Object.values(response.data.data); // Convert object to array
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
  