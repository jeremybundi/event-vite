<template>
  <div class="bg-white border rounded-lg shadow-md p-3">
    <img
      :src="event.image_url"
      alt="Event image"
      class="w-full h-80 w-80 object-cover rounded-lg shadow-md mx-auto"
    />
    <h2 class="text-xl font-semibold mt-2">{{ event.name }}</h2>
    <p class="text-gray-600">{{ event.date }}</p>

    <p class="text-gray-800 mt-2">{{ event.venue }}</p>

    <button
      @click="bookNow"
      class="mt-4 px-4 py-2 bg-yellow-600 items-center text-white rounded-lg"
    >
      Book Now
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  event: Object,
});

const router = useRouter();

const bookNow = () => {
  router.push({ name: 'EventDetails', params: { id: props.event.id } });
};
</script>

<style scoped>
/* Add any specific styling for EventCard here */
</style>
