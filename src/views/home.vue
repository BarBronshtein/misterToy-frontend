<template>
  <main class="home-page">
    <section class="charts">
      <div class="toys-type">
        <h2>Toys by label</h2>
        <DoughnutChart :chartData="testData" />
      </div>
      <div class="toys-type-price">
        <h2>Toys price by label</h2>
        <DoughnutChart :chartData="testPriceData" />
      </div>
    </section>
    <img src="../assets/img/home-svg.png" alt="" />
  </main>
</template>

<script>
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
      return {
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
    },
    testPriceData() {
      return {
        labels: Object.keys(this.$store.getters.toysPricePerLabel || ''),
        datasets: [
          {
            data: Object.values(this.$store.getters.toysPricePerLabel || ''),
            backgroundColor: [
              '#27CEFF',
              '#A079AF',
              '#624E6B',
              '#477AC4',
              '#AC58ED',
              '#71820AE',
              '#310CCC2',
            ],
          },
        ],
      };
    },
  },
};
</script>
