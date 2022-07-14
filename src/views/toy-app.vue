<template>
  <section class="toy-app">
    <toy-filter @setFilterBy="setFilter" @setSortBy="setSort" />
    <router-link to="toy/edit">Add toy</router-link>
    <toy-list :toys="toys" @removeToy="removeToy" />
    <!-- <section class="pagination"> -->
    <!-- <button @click="setPage(-1)" class="btn-pagination">Prev</button> -->
    <!-- <button @click="setPage(1)" class="btn-pagination">Next</button> -->
    <!-- </section> -->
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
      this.$store.commit({ tpye: 'setPage', diff });
    },
    setSort(status) {
      this.$store.commit({ type: 'sort', status });
    },
    setFilter(filterBy) {
      this.$store.dispatch({ type: 'loadToys', filterBy });
    },
  },
  computed: {
    toys() {
      return this.$store.getters.toysToDisplay;
    },
  },
};
</script>
