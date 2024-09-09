<template>
  <div class="container mx-auto p-4">
    <!-- Include the reusable TopBar component -->
    <TopBar />

    <!-- Ticket List Heading -->
    <h1 class="text-2xl font-bold mb-4 text-center">Ticket List</h1>

    <!-- Search Fields -->
    <div class="mb-4 flex flex-wrap gap-4 justify-center">
      <input
        v-model="searchById"
        type="text"
        placeholder="Search by Ticket ID"
        class="p-2 border rounded-md shadow-sm w-full max-w-xs"
      />
      <input
        v-model="searchByEventName"
        type="text"
        placeholder="Search by Event Name"
        class="p-2 border rounded-md shadow-sm w-full max-w-xs"
      />
    </div>

    <!-- Filtered Event Count -->
    <div v-if="filteredTicketsByEventName.length > 0" class="mb-4 text-center">
      <p class="font-semibold">
        Filtered Tickets for Event: {{ searchByEventName }}
      </p>
      <p class="text-gray-600">
        Total Count: {{ filteredTicketsByEventName.length }}
      </p>
    </div>

    <!-- Ticket List -->
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
      <!-- Header row for titles -->
      <div
        class="grid grid-cols-5 gap-2 bg-gray-200 p-2 font-semibold text-gray-700 rounded-md shadow-md"
      >
        <div class="text-center">Ticket ID</div>
        <div class="text-center">Event Name</div>
        <div class="text-center">Category</div>
        <div class="text-center">Payment Status</div>
        <div class="text-center">Redeem Status</div>
      </div>
      <!-- Ticket rows -->
      <div
        v-for="(ticket, index) in filteredTickets"
        :key="ticket.ticket_id"
        class="grid grid-cols-5 gap-2 bg-white shadow-md rounded-md p-2"
      >
        <div class="text-center">{{ ticket.ticket_id }}</div>
        <div class="text-center">{{ ticket.event_name }}</div>
        <div class="text-center">{{ ticket.category_name }}</div>
        <div
          :class="getPaymentStatusClass(ticket.payment_status)"
          class="text-center"
        >
          {{ getPaymentStatus(ticket.payment_status) }}
        </div>
        <div class="text-center">
          {{ getRedeemedStatus(ticket.redeemed_ticket) }}
        </div>
      </div>
    </div>
    <div
      v-else-if="status === 'success' && filteredTickets.length === 0"
      class="text-gray-500 text-center"
    >
      No tickets available.
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { useAuthStore } from '../stores/userStore';
import { useRouter } from 'vue-router';
import TopBar from './TopBar.vue'; // Import the reusable component

export default {
  components: {
    TopBar, // Register the TopBar component
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const tickets = ref([]);
    const searchById = ref('');
    const searchByEventName = ref('');
    const status = ref('loading');

    onMounted(async () => {
      try {
        const token = authStore.token;

        if (!token) {
          throw new Error('Token is not available');
        }

        const response = await axios.get('/api/customer/tickets', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.tickets) {
          tickets.value = response.data.tickets;
        } else {
          console.error('Unexpected response structure:', response.data);
          tickets.value = [];
        }

        status.value = 'success';
      } catch (error) {
        console.error('Failed to fetch tickets:', error);
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

    const filteredTicketsByEventName = computed(() => {
      if (!searchByEventName.value) return [];
      return tickets.value.filter((ticket) =>
        ticket.event_name
          .toLowerCase()
          .includes(searchByEventName.value.toLowerCase())
      );
    });

    const getPaymentStatus = (status) => {
      switch (status) {
        case null:
          return 'Pending';
        case '0':
          return 'Not Paid';
        case '1':
          return 'Paid';
        default:
          return 'Unknown';
      }
    };

    const getPaymentStatusClass = (status) => {
      switch (status) {
        case null:
          return 'text-yellow-500'; // Pending status color
        case '0':
          return 'text-red-500'; // Not Paid color
        case '1':
          return 'text-green-500'; // Paid color
        default:
          return 'text-gray-500'; // Unknown status color
      }
    };

    const getRedeemedStatus = (redeemedStatus) => {
      return redeemedStatus === '1' ? 'Yes' : 'No';
    };

    return {
      tickets,
      searchById,
      searchByEventName,
      status,
      filteredTickets,
      filteredTicketsByEventName,
      getPaymentStatus,
      getPaymentStatusClass,
      getRedeemedStatus,
      authStore,
    };
  },
};
</script>

<style scoped>
/* Add custom styles if needed */
</style>
