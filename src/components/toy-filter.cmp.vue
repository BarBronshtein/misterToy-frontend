<template>
  <section class="toy-filter">
    <input
      type="search"
      @input="setFilterBy"
      v-model="filterBy.txt"
      placeholder="Search toy..."
    />
    <input type="checkbox" @change="setFilterBy" v-model="filterBy.inStock" />
    <select multiple>
      <option v-for="opt in options" :key="opt">{{ opt }}</option>
    </select>
    <button @click="setSortBy('date')" class="btn">Date</button>
    <button @click="setSortBy('txt')" class="btn">Name</button>
  </section>
</template>

<script>
import { toyService } from '../services/toy-services.js';
import { utilService } from '../services/util-service.js';
export default {
  data() {
    return {
      options: toyService.getLabels(),
      filterBy: {
        txt: '',
        inStock: '',
        labels: [],
      },
      sortBy: {
        txt: '',
        maxPrice: 350,
      },
    };
  },
  created() {
    this.setFilterBy = utilService.debounce(this.setFilterBy);
  },
  methods: {
    setFilterBy() {
      this.$store.commit({ type: 'filter', filterBy: { ...this.filterBy } });
    },
    setSortBy() {
      this.$store.commit({ type: 'setSortBy', sortBy: this.sortBy });
    },
  },
};
</script>
