<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4 text-center">All Tickets</h1>

    <!-- Search Fields -->
    <div class="mb-4 flex flex-col sm:flex-row sm:gap-4 justify-center">
      <input
        v-model="searchById"
        type="text"
        placeholder="Search by Ticket ID"
        class="p-2 border rounded-md shadow-sm w-full max-w-xs mb-2 sm:mb-0"
      />
      <div class="relative w-full max-w-xs">
        <input
          v-model="searchByEventName"
          type="text"
          placeholder="Search by Event Name"
          class="p-2 border rounded-md shadow-sm w-full"
        />
        <div v-if="searchByEventName" class="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-lg mt-2 p-2">
          <p class="font-semibold">Validated: {{ validatedTicketsCount }}</p>
          <p class="font-semibold">Not Validated: {{ notValidatedTicketsCount }}</p>
        </div>
      </div>
    </div>

    <!-- Validated and Not Validated Count Fields -->
    <div class="mb-4 flex flex-col sm:flex-row sm:gap-4 justify-center">
      <div class="w-full max-w-xs">
        <p class="font-semibold">Total Validated Tickets: {{ validatedTicketsCount }}</p>
      </div>
      <div class="w-full max-w-xs">
        <p class="font-semibold">Total Not Validated Tickets: {{ notValidatedTicketsCount }}</p>
      </div>
    </div>

    <!-- Filtered Event Count -->
    <div v-if="filteredTicketsByEventName.length > 0" class="mb-4 text-center">
      <p class="font-semibold">Filtered Tickets for Event: {{ searchByEventName }}</p>
      <p class="text-gray-600">Total Count: {{ filteredTicketsByEventName.length }}</p>
    </div>

    <!-- Ticket List -->
    <div v-if="status === 'loading'" class="text-blue-500 text-center">Loading...</div>
    <div v-if="status === 'error'" class="text-red-500 text-center">Failed to load tickets.</div>
    <div v-if="status === 'success' && filteredTickets.length > 0" class="space-y-2">
      <!-- Header row for titles -->
      <div class="grid grid-cols-1 sm:grid-cols-6 gap-2 bg-gray-200 p-2 font-semibold text-gray-700 rounded-md shadow-md">
        <div class="text-center">No.</div>
        <div class="text-center">Ticket ID</div>
        <div class="text-center">Event Name</div>
        <div class="text-center">Category</div>
        <div class="text-center">Action</div>
      </div>
      <!-- Ticket rows -->
      <div
        v-for="(ticket, index) in filteredTickets"
        :key="ticket.ticket_id"
        class="grid grid-cols-1 sm:grid-cols-6 gap-2 bg-white shadow-md rounded-md p-2"
      >
        <div class="text-center">{{ index + 1 }}</div>
        <div class="text-center">{{ ticket.ticket_id }}</div>
        <div class="text-center">{{ ticket.event_name }}</div>
        <div class="text-center">{{ ticket.category_name }}</div>
    
        <div class="text-center">
          <template v-if="ticket.valid_status == 1">
            <span class="text-green-500">Validated</span>
          </template>
          <template v-else>
            <button
              @click="validateTicket(ticket.ticket_id)"
              class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Validate
            </button>
          </template>
        </div>
      </div>
    </div>
    <div v-else-if="status === 'success' && filteredTickets.length === 0" class="text-gray-500 text-center">No tickets available.</div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '../stores/auth'; // Ensure this path is correct
import axios from 'axios';

export default {
  setup() {
    const auth = useAuthStore();
    const tickets = ref([]);
    const searchById = ref('');
    const searchByEventName = ref('');
    const status = ref('loading');

    // Fetch paid tickets data from the API when the component is mounted
    onMounted(async () => {
      try {
        const response = await axios.get('/api/tickets/paid', {
          headers: {
            Authorization: `Bearer ${auth.getToken()}`,
          },
        });
        tickets.value = response.data.tickets || [];
        status.value = 'success';
        console.log('Paid Tickets fetched:', tickets.value);
      } catch (error) {
        console.error('Failed to fetch tickets:', error);
        status.value = 'error';
      }
    });

    const filteredTickets = computed(() => {
      if (!searchById.value && !searchByEventName.value) return tickets.value;
      return tickets.value.filter(ticket =>
        (searchById.value ? ticket.ticket_id.includes(searchById.value) : true) &&
        (searchByEventName.value ? ticket.event_name.toLowerCase().includes(searchByEventName.value.toLowerCase()) : true)
      );
    });

    const filteredTicketsByEventName = computed(() => {
      if (!searchByEventName.value) return [];
      return tickets.value.filter(ticket => ticket.event_name.toLowerCase().includes(searchByEventName.value.toLowerCase()));
    });

    const validatedTicketsCount = computed(() => {
      return filteredTicketsByEventName.value.filter(ticket => ticket.valid_status === 1).length;
    });

    const notValidatedTicketsCount = computed(() => {
      return filteredTicketsByEventName.value.filter(ticket => ticket.valid_status === 0).length;
    });

    const validateTicket = async (ticketId) => {
      try {
        await axios.post(`/api/update/ticket/status/${ticketId}`, {}, {
          headers: {
            Authorization: `Bearer ${auth.getToken()}`,
          },
        });
        // Refresh tickets after validation
        const response = await axios.get('/api/tickets/paid', {
          headers: {
            Authorization: `Bearer ${auth.getToken()}`,
          },
        });
        tickets.value = response.data.tickets || [];
        console.log('Ticket validated succesfully')
      } catch (error) {
        console.error('Failed to validate ticket:', error);
      }
    };

    return {
      auth,
      tickets,
      searchById,
      searchByEventName,
      status,
      filteredTickets,
      filteredTicketsByEventName,
      validatedTicketsCount,
      notValidatedTicketsCount,
      validateTicket,
    };
  },
};
</script>
