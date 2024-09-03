<template>
    <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70">
      <div id="ticket-container" class="bg-gradient-to-br from-white to-gray-100 p-4 rounded-lg shadow-2xl max-w-xs w-full relative border-2 border-gray-300">
        <!-- Close button -->
        <button @click="$emit('close')" class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
  
        <!-- Ticket details -->
        <h2 class="text-2xl font-bold mb-4 text-center text-gray-700 font-sans">Ticket Details</h2>
        <div v-if="ticket" class="text-center space-y-2">
          <p class="text-gray-800 font-semibold text-lg"><strong class="text-gray-700">Event Name:</strong> {{ ticket.event_name }}</p>
          <p class="text-gray-700 font-medium text-base"><strong>Category:</strong> {{ ticket.category_name }}</p>
          <p class="text-gray-700 text-base">
            <strong class="font-medium">Status:</strong>
            <span :class="{'text-green-500 font-bold': ticket.valid_status === '1', 'text-red-500 font-bold': ticket.valid_status === '0'}">
              {{ ticket.valid_status === '1' ? 'Valid' : 'Invalid' }}
            </span>
          </p>
          <p class="text-gray-700 text-base">
            <strong class="font-medium">Redeemed:</strong>
            <span :class="{'text-green-500 font-bold': ticket.redeemed_ticket === '1', 'text-red-500 font-bold': ticket.redeemed_ticket === '0'}">
              {{ ticket.redeemed_ticket === '1' ? 'Yes' : 'No' }}
            </span>
          </p>
          <div v-if="ticket.qr_code" class="text-center mt-4">
            <img :src="ticket.qr_code" ref="qrCodeImage" alt="QR Code" class="mx-auto rounded-lg shadow-lg w-24 h-24" />
            <p class="text-sm text-gray-500 mt-2">Visit: <a href="http://www.legacyevents.com" target="_blank" class="underline text-blue-500">www.legacyevents.com</a></p>
          </div>
          <p v-else class="mt-4 text-red-500 text-center">Error loading QR code image.</p>
        </div>
  
        <!-- Action buttons -->
        <div class="mt-4 flex justify-center space-x-4">
          <button @click="downloadTicket" class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded shadow-md font-medium">Download Ticket</button>
          <button @click="$emit('close')" class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded shadow-md font-medium">Close</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import html2canvas from 'html2canvas'; // Import html2canvas
  
  export default {
    props: {
      ticket: Object
    },
    methods: {
      downloadTicket() {
        const element = document.getElementById('ticket-container');
        html2canvas(element).then((canvas) => {
          const dataUrl = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `Ticket_${this.ticket.ticket_id}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
      }
    }
  }
  </script>
  
  <style scoped>
  p {
    margin-bottom: 0.5rem;
  }
  .font-sans {
    font-family: 'Roboto', sans-serif;
  }
  </style>
  