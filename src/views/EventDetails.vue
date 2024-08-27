<template>
  <div class="p-6">
    <div v-if="loading" class="text-center text-gray-500">Loading...</div>

    <div v-else-if="event" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Left Column -->
      <div class="space-y-6">
        <!-- Event Name -->
        <h1 class="text-4xl font-bold text-gray-900 text-center">{{ event.name }}</h1>

        <!-- Image -->
        <img :src="event.image_url" alt="Event Image" class="w-full max-w-md h-auto object-cover rounded-lg shadow-md mx-auto" />

        <!-- Event Details -->
        <div class="bg-gray-100 p-6 rounded-lg shadow-lg">
          <p class="text-lg font-medium text-gray-700"><strong>Date:</strong> {{ event.date }}</p>
          <p class="text-lg font-medium text-gray-700"><strong>Start Time:</strong> {{ event.start_time }}</p>
          <p class="text-lg font-medium text-gray-700"><strong>End Time:</strong> {{ event.end_time }}</p>
          <p class="text-lg font-medium text-gray-700"><strong>Venue:</strong> {{ event.venue }}</p>
          <p class="text-lg font-medium text-gray-700 mt-4">{{ event.description }}</p>
        </div>
      </div>

      <!-- Right Column -->
      <div class="space-y-6">
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Ticket Categories</h2>

          <div v-for="(category, index) in event.ticket_categories" :key="index" class="mb-4">
            <h3 class="text-xl font-semibold text-gray-800">{{ category.category_name }}</h3>
            <p class="text-lg font-medium text-gray-700"><strong>Price:</strong> ${{ category.price }}</p>

            <div class="flex items-center mt-2">
              <button @click="decreaseQuantity(index)" class="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">-</button>
              <span class="mx-4 text-xl">{{ quantities[index] }}</span>
              <button @click="increaseQuantity(index)" class="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">+</button>
            </div>
          </div>

          <!-- Total Price Field -->
          <div class="mt-6">
            <p class="text-lg font-medium text-gray-800 mb-2"><strong>Total Price:</strong></p>
            <input
              type="text"
              :value="totalPrice"
              readonly
              class="w-full p-3 border border-gray-300 rounded-md shadow-md bg-gray-50 text-gray-800"
            />
          </div>

          <!-- Payment Method Dropdown -->
          <div class="mt-6">
            <p class="text-lg font-medium text-gray-800 mb-2"><strong>Select Payment Method:</strong></p>
            <select v-model="selectedPaymentMethod" class="w-full p-3 border border-gray-300 rounded-md shadow-md bg-gray-50 text-gray-800">
              <option value="mpesa">M-Pesa</option>
              <option value="card">Card</option>
            </select>
          </div>

          <!-- Buy Tickets Button -->
          <button @click="buyTickets" class="w-full bg-yellow-600 text-white py-3 px-6 rounded-md shadow-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 text-lg font-semibold mt-4">Buy Tickets</button>

          <!-- Pay Now Button -->
          <button @click="payNow" class="w-48 bg-green-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-lg font-semibold mt-4 block mx-auto">Pay Now</button>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-red-500 mt-6">Error loading event details</div>

 
   
  </div>
</template>

<script>
import axios from 'axios';
import { useAuthStore } from '../stores/auth'; // Adjust the import path as needed

export default {
  data() {
    return {
      event: null,
      loading: true,
      quantities: [], // Track quantities for each category
      selectedPaymentMethod: 'mpesa', // Default payment method
    };
  },
  computed: {
    totalPrice() {
      return this.event.ticket_categories.reduce((total, category, index) => {
        return total + (category.price * this.quantities[index]);
      }, 0).toFixed(2); // Format as currency
    }
  },
  methods: {
    async fetchEvent() {
      try {
        const eventId = this.$route.params.id; // Assuming you're using Vue Router
        const response = await axios.get(`/api/event/get/${eventId}`);
        this.event = response.data.data;
        console.log(response.data.data);
        this.quantities = this.event.ticket_categories.map(() => 0); // Initialize quantities
      } catch (error) {
        console.error('Error fetching event:', error);
        this.event = null;
      } finally {
        this.loading = false;
      }
    },
    increaseQuantity(index) {
      if (this.quantities[index] < this.event.ticket_categories[index].quantity_available) {
        this.quantities[index]++;
      }
    },
    decreaseQuantity(index) {
      if (this.quantities[index] > 0) {
        this.quantities[index]--;
      }
    },
    async buyTickets() {
      try {
        const authStore = useAuthStore();
        const token = authStore.token; // Get the token from Pinia store

        const bookingData = {
          booking: this.event.ticket_categories.map((category, index) => ({
            event_id: this.event.id,
            ticket_category_id: category.ticket_category_id,
            quantity: this.quantities[index]
          })),
          payment_method: this.selectedPaymentMethod
        };

        const response = await axios.post('/api/booking/create', bookingData, {
          headers: {
            'Authorization': `Bearer ${token}` // Include the token in the request headers
          }
        });

        // Reset quantities to zero after a successful booking
        this.quantities = this.event.ticket_categories.map(() => 0);
        console.log('Booking successful!'); // Set success message
      } catch (error) {
        console.error('Error buying tickets:', error);
        this.bookingMessage = ''; // Clear success message
        alert('Failed to buy tickets');
      }
    },
    payNow() {
      // Add your payment logic here
      alert('Proceeding to payment...');
    }
  },
  created() {
    this.fetchEvent();
  }
};
</script>

<style scoped>
/* Add your styles here if needed */
</style>
