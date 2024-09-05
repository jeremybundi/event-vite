<template>
  <div class="p-6">
    <div v-if="loading" class="text-center text-gray-500">Loading...</div>

    <div v-else-if="event" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Left Column -->
      <div class="space-y-6">
        <!-- Event Name -->
        <h1 class="text-4xl font-bold text-gray-900 text-center">{{ event.name }}</h1>

        <!-- Image -->
        <img :src="event.image_url" alt="Event Image" class="w-70 max-w-md h-80 object-cover rounded-lg shadow-md mx-auto" />

        <!-- Event Details -->
        <div class="bg-gray-100 p-6 rounded-lg shadow-lg">
          <p class="text-lg font-medium text-gray-700"><strong>Date:</strong> {{ event.date }}</p>
          <p class="text-lg font-medium text-gray-700"><strong>Start Time:</strong> {{ event.start_time }}</p>
          <p class="text-lg font-medium text-gray-700"><strong>End Time:</strong> {{ event.end_time }}</p>
          <p class="text-lg font-medium text-gray-700"><strong>Venue:</strong> {{ event.venue }}</p>
          <p class="text-lg font-medium text-gray-700 mt-4">{{ event.description }}</p>
        </div>
      </div>

      <!-- Right Column with Ticket Categories and Sub-column -->
      <div class="space-y-6">
        <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Ticket Categories</h2>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Ticket Categories Sub-column -->
            <div>
              <div v-for="(category, index) in event.ticket_categories" :key="index" class="mb-4">
                <h3 class="text-xl font-semibold text-gray-800">{{ category.category_name }}</h3>
                <p class="text-lg font-medium text-gray-700"><strong>Price:</strong> Ksh. {{ category.price }}</p>

                <div class="flex items-center mt-2">
                  <button @click="decreaseQuantity(index)" class="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">-</button>
                  <span class="mx-4 text-xl">{{ quantities[index] }}</span>
                  <button @click="increaseQuantity(index)" class="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">+</button>
                </div>
              </div>
            </div>

            <!-- Price, Phone, Email, and Buy Button Sub-column -->
            <div class="flex flex-col justify-center items-center space-y-4">
              <!-- Total Price Field -->
              <div>
                <p class="text-lg font-medium text-gray-800 mb-2"><strong>Total Price:</strong></p>
                <input
                  type="text"
                  :value="totalPrice"
                  readonly
                  class="w-60 p-2 border mr-20 border-gray-300 rounded-md shadow-md bg-gray-50 text-gray-800"
                />
              </div>

              <!-- Phone Number Field -->
              <div>
                <label for="phone" class="block text-lg font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="text"
                  v-model="phone"
                  @input="validatePhone"
                  id="phone"
                  placeholder="2547..."
                  class="w-60 p-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                  pattern="\d*" 
                />
                <p class="text-gray-500 text-sm mt-2">Please enter the correct number you will pay with. Only numbers are allowed.</p>
                <p v-if="phoneError" class="text-red-500 text-sm mt-2">{{ phoneError }}</p>
              </div>

              <!-- Email Field -->
              <div>
                <label for="email" class="block text-lg font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  v-model="email"
                  @input="validateEmail"
                  id="email"
                  placeholder="Enter your email"
                  class="w-60 p-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                />
                <p class="text-gray-500 text-sm mt-2">Please enter the email that will receive the ticket. Ensure it is correct.</p>
                <p v-if="emailError" class="text-red-500 text-sm mt-2">{{ emailError }}</p>
              </div>

              <!-- Buy Tickets Button -->
              <button @click="buyTickets" class="w-full bg-yellow-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 text-lg font-semibold mt-4">Buy Tickets</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-red-500 mt-6">Error loading event details</div>
  </div>
</template>

<script>
import axios from 'axios';
import Header from './Header.vue'

export default {
  data() {
    return {
      event: null,
      loading: true,
      quantities: [], 
      selectedPaymentMethod: 'mpesa', 
      phone: '',
      email: '',  
      phoneError: '', 
      emailError: ''  
    };
  },
  computed: {
    totalPrice() {
      return this.event.ticket_categories.reduce((total, category, index) => {
        return total + (category.price * this.quantities[index]);
      }, 0).toFixed(2); 
    }
  },
  methods: {
    async fetchEvent() {
      try {
        const eventId = this.$route.params.id; 
        const response = await axios.get(`/api/event/get/${eventId}`);
        this.event = response.data.data;
        console.log(response.data.data);
        this.quantities = this.event.ticket_categories.map(() => 0); 
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
    validatePhone() {
      const phonePattern = /^2547\d{8}$/; 
      const numberPattern = /^\d+$/; 
      if (!this.phone || !numberPattern.test(this.phone)) {
        this.phoneError = 'Phone number must contain only numbers.';
      } else if (!phonePattern.test(this.phone)) {
        this.phoneError = 'Phone number must start with 2547 and be 12 digits long.';
      } else {
        this.phoneError = '';
      }
    },
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
      if (!this.email || !emailPattern.test(this.email)) {
        this.emailError = 'Invalid email format.';
      } else {
        this.emailError = '';
      }
    },
    async buyTickets() {
      // Validate phone and email before proceeding
      this.validatePhone();
      this.validateEmail();

      if (this.phoneError || this.emailError) {
        return; 
      }

      try {
        const bookingData = {
          booking: this.event.ticket_categories.map((category, index) => ({
            event_id: this.event.id,
            ticket_category_id: category.ticket_category_id,
            quantity: this.quantities[index]
          })),
          payment_method: this.selectedPaymentMethod,
          phone: this.phone, 
          email: this.email  
        };

        const response = await axios.post('/api/booking/create', bookingData);

        // Reset quantities and inputs after a successful booking
        this.quantities = this.event.ticket_categories.map(() => 0);
        this.phone = '';
        this.email = '';
        this.phoneError = '';
        this.emailError = '';

        console.log('Booking successful!'); 
   
      } catch (error) {
        console.error('Error buying tickets:', error);
        console.log('Failed to buy tickets');
      }
    }
  },
  created() {
    this.fetchEvent();
  }
};
</script>

<style scoped>
/* Additional styles can go here */
</style>
