<template>
  <h2>Check out Some of our data</h2>
  <DoughnutChart :chartData="testData" />
  <DoughnutChart :chartData="testPriceData" />
</template>

<script>
import { toyService } from '../services/toy-services.js';
import { DoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
export default {
  name: 'home',
  components: { DoughnutChart },
  data() {
    return {};
  },
  computed: {
    testData() {
      const testData = {
        labels: Object.keys(this.$store.getters.toysPerLabel || ''),
        datasets: [
          {
            data: Object.values(this.$store.getters.toysPerLabel || ''),
            backgroundColor: [
              '#77CEFF',
              '#0079AF',
              '#123E6B',
              '#97B0C4',
              '#A5C8ED',
              '#7A8CDE1',
              '#64C11C2',
            ],
          },
        ],
      };
      return testData;
    },
    testPriceData() {
      const testData = {
        labels: Object.keys(this.$store.getters.toysPricePerLabel || ''),
        datasets: [
          {
            data: Object.values(this.$store.getters.toysPricePerLabel || ''),
            backgroundColor: [
              '#77CEFF',
              '#0079AF',
              '#123E6B',
              '#97B0C4',
              '#A5C8ED',
              '#7A8CDE1',
              '#64C11C2',
            ],
          },
        ],
      };
      return testData;
    },
  },
};
</script>
