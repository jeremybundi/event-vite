<template>
  <div class="p-6 max-w-4xl mx-auto bg-white shadow-xl rounded-lg">
    <h2 class="text-4xl font-bold mb-8 text-center text-gradient bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 text-transparent bg-clip-text">
      Event Analysis Report
    </h2>

    <!-- Event Search and Date Selection -->
    <div class="flex flex-col md:flex-row mb-6 gap-4 items-center justify-between">
      <!-- Event Search -->
      <div class="w-full md:w-1/2">
        <label for="search_event" class="block text-sm font-medium text-gray-700">Search Event</label>
        <input
          type="text"
          id="search_event"
          v-model="searchQuery"
          @input="filterEvents"
          placeholder="Enter event name..."
          class="mt-1 block w-full border-green-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
        />
      </div>

      <!-- Date Selection -->
      <div class="flex flex-col md:flex-row gap-4 w-full md:w-1/2">
        <div class="w-full md:w-1/2">
          <label for="start_date" class="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            id="start_date"
            v-model="startDate"
            class="mt-1 block w-full border-yellow-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          />
        </div>

        <div class="w-full md:w-1/2">
          <label for="end_date" class="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            id="end_date"
            v-model="endDate"
            class="mt-1 block w-full border-yellow-300 rounded-lg shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          />
        </div>
      </div>
    </div>

    <!-- Fetch Data Button -->
    <button
      @click="fetchData"
      class="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-green-500 to-red-500 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-red-600 transition duration-200"
    >
      Fetch Data
    </button>

    <!-- Loading State -->
    <div v-if="loading" class="text-center mt-8 text-gray-500 animate-pulse">Loading...</div>

    <!-- Events Data -->
    <div v-else>
      <div v-for="(event, eventId) in filteredEvents" :key="eventId" class="mb-8 p-6 bg-gradient-to-r from-gray-50 to-white rounded-lg shadow-lg border-l-4 border-green-400">
        <h3 class="text-3xl font-semibold text-green-800 mb-4">{{ event.event_name }}</h3>
        <p class="text-gray-800 mb-2">Total Tickets Sold: <span class="font-bold">{{ event.total_tickets_sold }}</span></p>
        <p class="text-gray-800 mb-4">Total Revenue: <span class="font-bold">Ksh. {{ event.total_revenue.toFixed(2) }}</span></p>

        <div class="mb-4">
          <h4 class="text-lg font-semibold text-green-800">Tickets Sold by Category:</h4>
          <ul class="ml-4 list-disc text-gray-800">
            <li v-for="(category, index) in event.categories" :key="index" class="mb-1">
              {{ category.category_name }}: <span class="font-bold">{{ category.tickets_sold }}</span> tickets
            </li>
          </ul>
        </div>

        <BarChart :data="formatChartData(event.categories)" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import BarChart from './BarChart.vue';
import { useAuthStore } from '../stores/auth'; 

export default {
  components: { BarChart },
  setup() {
    const authStore = useAuthStore();
    const events = ref({});
    const filteredEvents = ref({});
    const loading = ref(false);
    const startDate = ref('');
    const endDate = ref('');
    const searchQuery = ref('');

    const fetchData = async () => {
      if (!startDate.value || !endDate.value) {
        alert('Please select both start and end dates.');
        return;
      }

      loading.value = true;

      try {
        const response = await axios.get('/api/analysis/get/tickets/byDuration', {
          params: {
            start_date: startDate.value,
            end_date: endDate.value,
          },
          headers: {
            Authorization: `Bearer ${authStore.token}`, // Include the token from the auth store
          },
        });

        events.value = response.data.data.events;
        filteredEvents.value = events.value; // Initialize filteredEvents with all events
      } catch (error) {
        console.error('Error fetching event data:', error);
      } finally {
        loading.value = false;
      }
    };

    const formatChartData = (categories) => {
      return {
        labels: categories.map((cat) => cat.category_name),
        datasets: [
          {
            label: 'Tickets Sold',
            data: categories.map((cat) => parseInt(cat.tickets_sold, 10)),
            backgroundColor: '#FF7043',
            borderColor: '#FF5722',
            borderWidth: 1,
          },
        ],
      };
    };

    const filterEvents = () => {
      const query = searchQuery.value.toLowerCase();
      filteredEvents.value = Object.values(events.value).filter((event) =>
        event.event_name.toLowerCase().includes(query)
      );
    };

    onMounted(() => {
      // Set default dates if needed
      startDate.value = '2024-01-01';
      endDate.value = '2024-12-31';
      fetchData();
    });

    return { events, filteredEvents, loading, startDate, endDate, searchQuery, fetchData, filterEvents, formatChartData };
  },
};
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(to right, #FF7043, #FFCA28, #FF3D00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
