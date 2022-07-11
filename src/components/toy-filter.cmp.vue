<template>
  <section class="toy-filter">
    <div class="container">
      <div class="filter">
        <input
          type="search"
          @input="setFilterBy"
          v-model="filterBy.txt"
          placeholder="Search toy..."
        />
        <input
          type="checkbox"
          @change="setFilterBy"
          v-model="filterBy.inStock"
        />
        <select @change="setFilterBy" v-model="filterBy.labels" multiple>
          <option v-for="opt in options" :key="opt">{{ opt }}</option>
        </select>
      </div>
      <div class="sort">
        <button @click="setSortBy('date')" class="btn">Date</button>
        <button @click="setSortBy('name')" class="btn">Name</button>
        <button @click="setSortBy('price')" class="btn">Price</button>
      </div>
    </div>
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
        inStock: true,
        labels: [],
      },
    };
  },
  created() {
    this.setFilterBy = utilService.debounce(this.setFilterBy);
  },
  methods: {
    setFilterBy() {
      this.$store.commit({ type: 'filter', filterBy: this.filterCopy });
    },
    setSortBy(status) {
      this.$store.commit({ type: 'sort', sortBy: status });
    },
  },
  computed: {
    filterCopy() {
      return JSON.parse(JSON.stringify(this.filterBy));
    },
  },
};
</script>
