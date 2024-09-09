<template>
  <div class="relative overflow-hidden w-full h-40">
    <div
      class="flex transition-transform duration-700 ease-in-out"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div
        v-for="(image, index) in imageUrls"
        :key="index"
        class="flex-shrink-0 w-3/4 h-full flex items-center justify-center"
      >
        <img
          :src="image"
          :alt="'Image ' + (index + 1)"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';

const imageUrls = ref([]);
const currentIndex = ref(0);
let intervalId;

const fetchImages = async () => {
  try {
    const response = await axios.get('/api/event/get/public');
    const data = response.data.data;
    imageUrls.value = Object.values(data).map((event) => event.image_url);
  } catch (error) {
    console.error('Error fetching images:', error);
  }
};

const startSlideshow = () => {
  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % imageUrls.value.length;
  }, 6000);
};

const stopSlideshow = () => {
  clearInterval(intervalId);
};

onMounted(async () => {
  await fetchImages();
  startSlideshow();
});

onUnmounted(() => {
  stopSlideshow();
});
</script>

<style scoped>
/* Add any additional styling here if needed */
</style>
