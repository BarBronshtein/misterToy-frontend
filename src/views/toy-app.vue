<template>
  <section class="todo-app">
    <todo-filter />
    <todo-list @removeToy="removeToy" />
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
  created() {
    this.$store.dispatch({ type: 'loadToys' });
  },
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
  },
  computed: {
    toys() {
      return this.$store.getters.toysToDisplay;
    },
  },
};
</script>
