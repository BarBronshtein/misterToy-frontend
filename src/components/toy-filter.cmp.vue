<template>
  <section class="toy-filter">
    <div class="container">
      <div class="filter">
        <el-input
          @input="setFilterBy"
          v-model="filterBy.txt"
          placeholder="Search toy..."
        />
        <el-checkbox
          @change="setFilterBy"
          v-model="filterBy.inStock"
          label="In stock"
          size="large"
          border
        />

        <el-select
          v-model="filterBy.labels"
          multiple
          collapse-tags
          collapse-tags-tooltip
          placeholder="Select"
          style="width: 240px"
        >
          <el-option v-for="opt in options" :key="opt" :value="opt" />
        </el-select>
      </div>
      <div class="sort">
        <el-button @click="setSortBy('date')" type="info" plain>Date</el-button>
        <el-button @click="setSortBy('name')" type="info" plain>Name</el-button>
        <el-button @click="setSortBy('price')" type="info" plain
          >Price</el-button
        >
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
      this.$emit('setFilterBy', this.filterCopy);
    },
    setSortBy(status) {
      this.$emit('setSortBy', status);
    },
  },
  computed: {
    filterCopy() {
      return JSON.parse(JSON.stringify(this.filterBy));
    },
  },
};
</script>
