<template>
  <section class="toy-app">
    <toy-filter @setFilterBy="setFilter" @setSortBy="setSort" />
    <router-link v-if="user?.isAdmin" to="toy/edit">Add toy</router-link>
    <toy-list :toys="toys" @removeToy="removeToy" />
    <section class="pagination text-center">
      <el-button type="info" plain @click="setPage(-1)" class="btn-pagination"
        >Prev</el-button
      >
      <el-button type="info" plain @click="setPage(1)" class="btn-pagination"
        >Next</el-button
      >
    </section>
  </section>
</template>

<script>
import toyList from '../components/toy-list.cmp.vue';
import toyFilter from '../components/toy-filter.cmp.vue';
export default {
  components: {
    toyList,
    toyFilter,
  },
  methods: {
    removeToy(toyId) {
      this.$store.dispatch({
        type: 'removeToy',
        toyId,
      });
    },
    setPage(diff) {
      this.$store.commit({ type: 'setPage', diff });
    },
    setSort(status, filterBy) {
      this.$store.commit({ type: 'sort', status });
      this.$store.dispatch({ type: 'loadToys', filterBy });
    },
    setFilter(filterBy) {
      this.$store.dispatch({ type: 'loadToys', filterBy });
    },
  },

  computed: {
    toys() {
      return this.$store.getters.toysToDisplay;
    },
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>
