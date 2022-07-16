<template>
  <section class="toy-filter">
    <el-input
      @input="setFilterBy"
      v-model="filterBy.txt"
      clearable
      placeholder="Search toy..."
    />
    <div class="filter-form text-center">
      <el-checkbox
        @input="setFilterBy"
        v-model="filterBy.inStock"
        label="In stock"
        border
      />

      <el-select
        @change="setFilterBy"
        v-model="filterBy.labels"
        multiple
        collapse-tags
        collapse-tags-tooltip
        placeholder="Select"
      >
        <el-option v-for="opt in options" :key="opt" :value="opt" />
      </el-select>
      <div class="sort">
        <el-button @click="setSortBy('createdAt')" type="info" plain
          >Date</el-button
        >
        <el-button @click="setSortBy('name')" type="info" plain>Name</el-button>
        <el-button @click="setSortBy('price')" type="info" plain
          >Price</el-button
        >
      </div>
    </div>
  </section>
</template>

<script>
import { toyService } from '../services/toy-service.js';
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
    this.filterBy = this.$store.getters.filterBy;
    this.setFilterBy = utilService.debounce(this.setFilterBy);
  },
  methods: {
    setFilterBy() {
      this.$emit('setFilterBy', this.filterCopy);
    },
    setSortBy(status) {
      this.$emit('setSortBy', status, this.filterCopy);
    },
  },
  computed: {
    filterCopy() {
      return JSON.parse(JSON.stringify(this.filterBy));
    },
  },
};
</script>
