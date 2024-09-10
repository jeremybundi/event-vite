<template>
  <Header></Header>

  <div class="p-6 bg-gray-100 min-h-screen">
    <div class="flex items-center mb-8">
      <h1 class="text-3xl font-bold text-center flex-1 text-blue-600">
        Event Summary
      </h1>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search events by name..."
        class="p-2 border border-gray-300 rounded-lg ml-4"
      />
    </div>
    <div class="space-y-8">
      <div
        v-for="(event, eventId) in filteredEvents"
        :key="eventId"
        class="bg-white p-6 rounded-lg shadow-md border border-gray-300"
      >
        <h2 class="text-2xl font-semibold mb-4 text-blue-600">
          {{ event.event_name }}
        </h2>

        <div class="grid grid-cols-2 gap-4 mb-4">
          <div class="bg-blue-50 p-4 rounded-lg shadow-inner">
            <p class="text-blue-800">
              <strong>Total Tickets Sold:</strong>
              {{ event.total_tickets_sold }}
            </p>
            <p class="text-blue-800">
              <strong>Total Revenue:</strong> Ksh. {{ event.total_revenue }}
            </p>
            <p class="text-blue-800">
              <strong>Total Tickets Available:</strong>
              {{ event.total_tickets_available }}
            </p>
          </div>
          <div class="bg-green-50 p-4 rounded-lg shadow-inner">
            <p class="text-green-800">
              <strong>Valid Tickets:</strong> {{ event.total_valid_tickets }}
            </p>
            <p class="text-green-800">
              <strong>Redeemed Tickets:</strong>
              {{ event.total_redeemed_tickets }}
            </p>
          </div>
        </div>

        <h3 class="text-xl font-semibold mb-3 text-gray-800">Categories:</h3>
        <div class="space-y-4">
          <div
            v-for="(category, index) in event.categories"
            :key="index"
            class="bg-gray-50 p-4 rounded-lg shadow-inner"
          >
            <h4 class="text-lg font-semibold mb-2 text-green-600">
              {{ category.category_name }}
            </h4>
            <p>
              <strong>Tickets Available:</strong>
              {{ category.tickets_available }}
            </p>
            <p><strong>Tickets Sold:</strong> {{ category.tickets_sold }}</p>
            <p>
              <strong>Remaining Tickets:</strong>
              {{ category.remaining_tickets }}
            </p>
            <p><strong>Price:</strong> Ksh. {{ category.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '../stores/auth';
import Header from './Header.vue';

export default {
  components: {
    Header,
  },
  data() {
    return {
      eventsData: {}, 
      searchQuery: '', 
    };
  },
  mounted() {
    this.fetchEventsData(); 
  },
  computed: {
    filteredEvents() {
      // Return all events if no search query
      if (!this.searchQuery) {
        return this.eventsData;
      }
      // Filter events based on search query
      const query = this.searchQuery.toLowerCase();
      return Object.values(this.eventsData).filter((event) =>
        event.event_name.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    async fetchEventsData() {
      const authStore = useAuthStore();
      const token = authStore.getToken();

      try {
        // Fetch events data from the API
        const response = await axios.get('/api/analysis/event/statistics', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Store fetched data in eventsData
        this.eventsData = response.data.data;
        //console.log('Fetched data:', response.data.data);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Basic styling */
h1 {
  color: #1d4ed8;
}
h2,
h3,
h4 {
  font-weight: 600;
}
.bg-blue-50 {
  background-color: #eff6ff;
}
.bg-green-50 {
  background-color: #ecfdf5;
}
.bg-gray-50 {
  background-color: #f9fafb;
}
input[type='text'] {
  width: 300px;
}
</style>
