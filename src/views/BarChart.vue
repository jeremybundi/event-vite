<template>
  <div>
    <canvas ref="barChartCanvas"></canvas>
  </div>
</template>

<script>
import { onMounted, ref, nextTick } from 'vue';
import { Chart, registerables } from 'chart.js';

export default {
  name: 'BarChart',
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const barChartCanvas = ref(null);

    onMounted(async () => {
      await nextTick(); // Ensure DOM is fully rendered

      // Register all necessary components
      Chart.register(...registerables);

      const ctx = barChartCanvas.value.getContext('2d');
      /*console.log('Canvas element:', barChartCanvas.value);
        console.log('Canvas context:', ctx);
        console.log('Chart data:', props.data);*/

      if (!ctx) {
        console.error('Failed to get the canvas context.');
        return;
      }

      try {
        new Chart(ctx, {
          type: 'bar',
          data: props.data,
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
        console.log('Chart successfully created');
      } catch (error) {
        console.error('Error creating chart:', error);
      }
    });

    return {
      barChartCanvas,
    };
  },
};
</script>

<style scoped>
canvas {
  width: 100%;
  height: 400px;
}
</style>
