<template>
  <div>
    <Header></Header>

    <div class="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 class="text-3xl font-bold mb-4 text-center">Add New Event</h2>
      <form @submit.prevent="addEvent" class="space-y-6">
        <div class="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold mb-2">Event Details</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-group">
              <label for="name" class="block text-gray-700 font-medium mb-2"
                >Event Name</label
              >
              <input
                v-model="event.name"
                type="text"
                id="name"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div class="form-group">
              <label for="date" class="block text-gray-700 font-medium mb-2"
                >Date</label
              >
              <input
                v-model="event.date"
                type="date"
                id="date"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div class="form-group">
              <label
                for="start_time"
                class="block text-gray-700 font-medium mb-2"
                >Start Time</label
              >
              <input
                v-model="event.start_time"
                type="time"
                id="start_time"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div class="form-group">
              <label for="end_time" class="block text-gray-700 font-medium mb-2"
                >End Time</label
              >
              <input
                v-model="event.end_time"
                type="time"
                id="end_time"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div class="form-group">
              <label for="venue" class="block text-gray-700 font-medium mb-2"
                >Venue</label
              >
              <input
                v-model="event.venue"
                type="text"
                id="venue"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div class="form-group col-span-2">
              <label
                for="description"
                class="block text-gray-700 font-medium mb-2"
                >Description</label
              >
              <textarea
                v-model="event.description"
                id="description"
                rows="4"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <div class="form-group col-span-2">
              <label
                for="image_url"
                class="block text-gray-700 font-medium mb-2"
                >Image URL</label
              >
              <input
                v-model="event.image_url"
                type="text"
                id="image_url"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div class="form-group col-span-2">
              <label
                for="total_tickets"
                class="block text-gray-700 font-medium mb-2"
                >Total Tickets</label
              >
              <input
                v-model="event.total_tickets"
                type="number"
                id="total_tickets"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        <div class="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold mb-2">Ticket Categories</h3>
          <div
            v-for="(category, index) in ticket_categories"
            :key="index"
            class="space-y-4 mb-4"
          >
            <div class="form-group">
              <label
                :for="'category_name_' + index"
                class="block text-gray-700 font-medium mb-2"
                >Category Name</label
              >
              <input
                v-model="category.category_name"
                :id="'category_name_' + index"
                type="text"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div class="form-group">
              <label
                :for="'price_' + index"
                class="block text-gray-700 font-medium mb-2"
                >Price</label
              >
              <input
                v-model="category.price"
                :id="'price_' + index"
                type="number"
                step="0.01"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div class="form-group">
              <label
                :for="'quantity_available_' + index"
                class="block text-gray-700 font-medium mb-2"
                >Quantity Available</label
              >
              <input
                v-model="category.quantity_available"
                :id="'quantity_available_' + index"
                type="number"
                class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <button
            @click="addTicketCategory"
            type="button"
            class="bg-green-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Add Ticket Category
          </button>
        </div>

        <button
          type="submit"
          class="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Add Event
        </button>
      </form>
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
      event: {
        name: '',
        date: '',
        start_time: '',
        end_time: '',
        venue: '',
        description: '',
        total_tickets: 0,
        image_url: '',
      },
      ticket_categories: [
        {
          category_name: '',
          price: 0.0,
          quantity_available: 0,
        },
      ],
    };
  },
  setup() {
    const authStore = useAuthStore(); // Initialize the auth store
    return { authStore };
  },
  methods: {
    addTicketCategory() {
      this.ticket_categories.push({
        category_name: '',
        price: 0.0,
        quantity_available: 0,
      });
    },
    async addEvent() {
      try {
        const token = this.authStore.getToken();
        // Adjust the data structure to match the server expectation
        const response = await axios.post(
          '/api/event/add',
          {
            event: this.event,
            ticket_categories: this.ticket_categories,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('Server response:', response); // Log the server response here
        if (response && response.data) {
          console.log('Event added successfully');
          this.resetForm();
        } else {
          console.error('Unexpected response format', response);
          alert('Unexpected response format');
        }
      } catch (error) {
        if (error.response && error.response.data) {
          console.error('Error adding event:', error.response.data);
          alert(`Error adding event: ${error.response.data.message}`);
        } else {
          console.error('Error adding event:', error);
          alert('Error adding event');
        }
      }
    },
    resetForm() {
      this.event = {
        name: '',
        date: '',
        start_time: '',
        end_time: '',
        venue: '',
        description: '',
        total_tickets: 0,
        image_url: '',
      };
      this.ticket_categories = [
        {
          category_name: '',
          price: 0.0,
          quantity_available: 0,
        },
      ];
    },
  },
};
</script>
