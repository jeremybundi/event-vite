<template>
  <div class="container mx-auto p-4">
    <!-- Reusable TopBar Component -->
    <TopBar />

    <h1 class="text-2xl font-bold mb-4 text-center">Paid Tickets</h1>

    <!-- Search Fields -->
    <div class="flex justify-center mb-4">
      <input
        v-model="searchById"
        placeholder="Search by Ticket ID"
        class="border p-2 rounded mr-2"
      />
      <input
        v-model="searchByEventName"
        placeholder="Search by Event Name"
        class="border p-2 rounded"
      />
    </div>

    <!-- Status Messages -->
    <div v-if="status === 'loading'" class="text-blue-500 text-center">
      Loading...
    </div>
    <div v-if="status === 'error'" class="text-red-500 text-center">
      Failed to load tickets.
    </div>
    <div
      v-if="status === 'success' && filteredTickets.length > 0"
      class="space-y-2"
    >
      <!-- Header Row for Titles -->
      <div
        class="grid grid-cols-1 sm:grid-cols-6 gap-2 bg-gray-200 p-2 font-semibold text-gray-700 rounded-md shadow-md"
      >
        <div class="text-center">Ticket ID</div>
        <div class="text-center">Event Name</div>
        <div class="text-center">Category</div>
        <div class="text-center">Validated</div>
        <div class="text-center">Get ticket</div>
      </div>

      <!-- Ticket Rows -->
      <div
        v-for="(ticket, index) in filteredTickets"
        :key="ticket.ticket_id"
        class="grid grid-cols-1 sm:grid-cols-6 gap-2 bg-white shadow-md rounded-md p-2"
      >
        <div class="text-center">{{ ticket.ticket_id }}</div>
        <div class="text-center">{{ ticket.event_name }}</div>
        <div class="text-center">{{ ticket.category_name }}</div>
        <div class="text-center">
          <span :class="getValidationStatusClass(ticket.valid_status)">
            {{ getValidationStatus(ticket.valid_status) }}
          </span>
        </div>
        <div class="text-center">
          <!-- Conditionally show the "View Ticket" button based on valid_status -->
          <button
            v-if="ticket.valid_status == 1"
            @click="openModal(ticket)"
            class="text-blue-700 font-semibold text-sm hover:underline"
          >
            view ticket
          </button>
          <p v-else class="text-red-500">Ticket not validated.</p>
        </div>
      </div>
    </div>

    <!-- No Tickets Available Message -->
    <div
      v-else-if="status === 'success' && filteredTickets.length == 0"
      class="text-gray-500 text-center"
    >
      No tickets available.
    </div>

    <!-- Conditionally Render Ticket Modal Component -->
    <TicketModal
      v-if="isModalOpen"
      :ticket="selectedTicket"
      @close="closeModal"
    />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../stores/userStore';
import TicketModal from './TicketModal.vue';
import TopBar from './TopBar.vue'; // Import the TopBar component

export default {
  components: {
    TicketModal,
    TopBar, // Register the TopBar component
  },
  setup() {
    const userStore = useAuthStore();
    const tickets = ref([]);
    const searchById = ref('');
    const searchByEventName = ref('');
    const status = ref('loading');
    const isModalOpen = ref(false);
    const selectedTicket = ref(null);

    onMounted(async () => {
      try {
        const response = await axios.get('/api/customer/tickets/paid', {
          headers: {
            Authorization: `Bearer ${userStore.token}`,
          },
        });
        tickets.value = response.data.tickets || [];
        status.value = 'success';
        console.log(response.data.tickets);
      } catch (error) {
        status.value = 'error';
      }
    });

    const filteredTickets = computed(() => {
      if (!searchById.value && !searchByEventName.value) return tickets.value;
      return tickets.value.filter(
        (ticket) =>
          (searchById.value
            ? ticket.ticket_id.includes(searchById.value)
            : true) &&
          (searchByEventName.value
            ? ticket.event_name
                .toLowerCase()
                .includes(searchByEventName.value.toLowerCase())
            : true)
      );
    });

    const getValidationStatus = (status) => {
      return status == 1 ? 'Yes' : 'No';
    };

    const getValidationStatusClass = (status) => {
      return status == 1 ? 'text-green-500' : 'text-red-500';
    };

    const openModal = (ticket) => {
      selectedTicket.value = ticket;
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    return {
      userStore,
      tickets,
      searchById,
      searchByEventName,
      status,
      filteredTickets,
      getValidationStatus,
      getValidationStatusClass,
      isModalOpen,
      selectedTicket,
      openModal,
      closeModal,
    };
  },
};
</script>
