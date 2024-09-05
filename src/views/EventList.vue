<template>
      <Header></Header>

  <div class="min-h-screen bg-gray-100 p-6">
    <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Upcoming Events</h1>

    <!-- Search Field -->
    <div class="flex justify-end mb-6">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by event name"
        class="p-2 border border-gray-300 rounded-lg focus:outline-none"
      />
    </div>

    <!-- Header Row for Titles -->
    <div class="grid grid-cols-6 gap-4 bg-gray-200 p-4 rounded-t-lg">
      <div class="font-semibold text-gray-700 text-left">#</div>
      <div class="font-semibold text-gray-700 text-left">Event Name</div>
      <div class="font-semibold text-gray-700 text-left">Image</div>
      <div class="font-semibold text-gray-700 text-left">Venue</div>
      <div class="font-semibold text-gray-700 text-left">Date</div>
      <div class="font-semibold text-gray-700 text-left">Actions</div>
    </div>

    <!-- Event List -->
    <div class="space-y-2">
      <div
        v-for="(event, index) in filteredEvents"
        :key="event.id"
        class="grid grid-cols-6 gap-4 bg-white p-4 rounded-lg shadow items-center"
      >
        <!-- Numbering -->
        <div class="text-lg font-semibold text-gray-800 text-left">{{ index + 1 }}.</div>

        <!-- Event Name -->
        <div class="text-lg font-semibold text-gray-800 text-left">
          {{ event.name }}
        </div>

        <!-- Event Image (Reduced size) -->
        <img
          :src="event.image_url"
          :alt="event.name"
          class="w-full h-32 object-cover rounded md:w-1/2 md:h-12"
        />

        <!-- Event Venue -->
        <div class="text-gray-600 text-left">{{ event.venue }}</div>

        <!-- Event Date -->
        <div class="text-gray-600 text-left">{{ event.date }}</div>

        <!-- Edit Button -->
        <div class="text-left">
          <button
            @click="editEvent(event)"
            class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Edit
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Form Component -->
    <EventEditForm
      v-if="selectedEvent"
      :event="selectedEvent"
      @saved="handleSave"
    />
  </div>
</template>

<script>
import EventEditForm from './EventEditForm.vue';
import { useAuthStore } from '../stores/auth';
import Header from './Header.vue'

export default {
  components: {
    EventEditForm,
    Header,
  },
  data() {
    return {
      events: [], // This will hold your event data
      selectedEvent: null,
      searchQuery: '', // This holds the search query
    };
  },
  computed: {
    filteredEvents() {
      if (this.searchQuery) {
        return this.events.filter((event) =>
          event.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      return this.events;
    },
  },
  created() {
    const authStore = useAuthStore();
    const token = authStore.getToken();

    // Fetch event list from API with Authorization header
    fetch('/api/event/get', {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          this.events = Object.values(data.data);
        }
      })
      .catch((error) => console.error('Error fetching events:', error));
  },
  methods: {
    editEvent(event) {
      this.selectedEvent = { ...event }; // Set the selected event for editing
    },
    handleSave(updatedEvent) {
      // Update the event in the list with the updated details
      const index = this.events.findIndex((e) => e.id === updatedEvent.id);
      if (index !== -1) {
        this.$set(this.events, index, updatedEvent);
        this.selectedEvent = null; // Close the edit form
      }
    },
  },
};
</script>

<style scoped>
/* Additional styling to ensure alignment and good appearance */
.bg-gray-200 {
  border-bottom: 2px solid #e5e7eb;
}

.bg-white {
  border: 1px solid #e5e7eb;
}

@media (max-width: 768px) {
  /* Styles for smaller screens */
  .grid {
    grid-template-columns: 1fr !important;
  }
  .text-lg {
    font-size: 1rem;
  }
}
</style>
