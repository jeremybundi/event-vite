<template>
    <div class="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative overflow-y-auto max-h-[80vh]">
        <h1 class="text-2xl font-bold mb-6">Create New Event</h1>
        <form @submit.prevent="createEvent" class="space-y-6">
          <!-- Form Fields -->
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label for="name" class="block text-gray-700">Event Name</label>
              <input v-model="event.name" id="name" type="text" class="mt-1 p-2 border rounded w-full" required />
            </div>
            <div>
              <label for="date" class="block text-gray-700">Date</label>
              <input v-model="event.date" id="date" type="date" class="mt-1 p-2 border rounded w-full" required />
            </div>
            <div>
              <label for="start_time" class="block text-gray-700">Start Time</label>
              <input v-model="event.start_time" id="start_time" type="time" class="mt-1 p-2 border rounded w-full" required />
            </div>
            <div>
              <label for="end_time" class="block text-gray-700">End Time</label>
              <input v-model="event.end_time" id="end_time" type="time" class="mt-1 p-2 border rounded w-full" required />
            </div>
            <div>
              <label for="venue" class="block text-gray-700">Venue</label>
              <input v-model="event.venue" id="venue" type="text" class="mt-1 p-2 border rounded w-full" required />
            </div>
            <div>
              <label for="description" class="block text-gray-700">Description</label>
              <textarea v-model="event.description" id="description" rows="4" class="mt-1 p-2 border rounded w-full" required></textarea>
            </div>
            <div>
              <label for="total_tickets" class="block text-gray-700">Total Tickets</label>
              <input v-model.number="event.total_tickets" id="total_tickets" type="number" class="mt-1 p-2 border rounded w-full" required />
            </div>
            <div>
              <label for="image_url" class="block text-gray-700">Image URL</label>
              <input v-model="event.image_url" id="image_url" type="url" class="mt-1 p-2 border rounded w-full" />
            </div>
          </div>
  
          <!-- Ticket Categories -->
          <div>
            <h2 class="text-xl font-semibold mb-4">Ticket Categories</h2>
            <div v-for="(category, index) in event.ticket_categories" :key="index" class="border p-4 rounded mb-4 bg-gray-50">
              <div class="grid grid-cols-1 gap-4">
                <div>
                  <label :for="'category_name_' + index" class="block text-gray-700">Category Name</label>
                  <input v-model="category.category_name" :id="'category_name_' + index" type="text" class="mt-1 p-2 border rounded w-full" required />
                </div>
                <div>
                  <label :for="'price_' + index" class="block text-gray-700">Price</label>
                  <input v-model.number="category.price" :id="'price_' + index" type="number" class="mt-1 p-2 border rounded w-full" />
                </div>
                <div>
                  <label :for="'quantity_available_' + index" class="block text-gray-700">Quantity Available</label>
                  <input v-model.number="category.quantity_available" :id="'quantity_available_' + index" type="number" class="mt-1 p-2 border rounded w-full" required />
                </div>
              </div>
            </div>
            <button @click.prevent="addCategory" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
              Add Category
            </button>
          </div>
  
          <!-- Action Buttons -->
          <div class="flex justify-end space-x-4">
            <button @click.prevent="cancel" class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition">
              Cancel
            </button>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              Save Changes
            </button>
          </div>
  
          <!-- Error Message -->
          <div v-if="errorMessage" class="text-red-500 mt-4">
            {{ errorMessage }}
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../stores/auth'; // Adjust the path as needed
  import { ref } from 'vue';
  
  export default {
    props: {
      event: {
        type: Object,
        default: () => ({
          name: '',
          date: '',
          start_time: '',
          end_time: '',
          venue: '',
          description: '',
          total_tickets: 0,
          image_url: '',
          ticket_categories: []
        })
      }
    },
    setup(props, { emit }) {
      const router = useRouter();
      const authStore = useAuthStore();
      const token = authStore.getToken();
      const errorMessage = ref('');
  
      const createEvent = async () => {
        if (!isValidEvent()) {
          errorMessage.value = 'Please fill in all required fields.';
          return;
        }
  
        // Prepare payload according to the API requirement
        const payload = {
          event: {
            name: props.event.name,
            date: props.event.date,
            start_time: props.event.start_time,
            end_time: props.event.end_time,
            venue: props.event.venue,
            description: props.event.description,
            total_tickets: props.event.total_tickets
          },
          ticket_categories: props.event.ticket_categories
        };
  
        try {
          console.log('Creating event with data:', payload);
  
          const response = await fetch(`/api/event/edit/${props.event.id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
          });
  
          const data = await response.json();
          console.log('Server response:', data);
  
          if (response.ok && data.status === 'success') {
            console.log('Event updated successfully');
            emit('saved', data);
          } else {
            console.error('Error updating event:', data.message || 'Unknown error');
            errorMessage.value = data.message || 'Unknown error';
          }
        } catch (error) {
          console.error('Error creating event:', error);
          errorMessage.value = 'An unexpected error occurred. Please try again.';
        }
      };
  
      const isValidEvent = () => {
        return props.event.name && props.event.date && props.event.start_time && props.event.end_time && props.event.venue && props.event.description && props.event.total_tickets;
      };
  
      const addCategory = () => {
        props.event.ticket_categories.push({
          category_name: '',
          price: 0.00,
          quantity_available: 0
        });
      };
  
      const cancel = () => {
        router.push('/list'); 
      };
  
      return {
        createEvent,
        addCategory,
        cancel,
        errorMessage
      };
    }
  };
  </script>
  
  <style scoped>
  /* Additional scoped styling */
  .error-message {
    color: red;
  }
  </style>
  

  






