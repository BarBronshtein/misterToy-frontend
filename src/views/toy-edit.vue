<template>
  <section v-if="toyToEdit" class="toy-edit">
    <router-link to="/toy">Go Back</router-link>
    {{ toyToEdit }}
    <h2>{{ toyToEdit._id ? 'Edit toy' : 'Add toy' }}</h2>
    <form @submit.prevent="saveToy"></form>
  </section>
</template>

<script>
import { toyService } from '../services/toy-services.js';

export default {
  data() {
    return {
      toyToEdit: null,
    };
  },
  created() {
    const { toyId } = this.$route.params;
    if (toyId) {
      toyService.getById(toyId).then(toy => {
        this.toyToEdit = JSON.parse(JSON.stringify(toy));
      });
    } else this.toyToEdit = toyService.getEmptyToy();
  },
  methods: {
    saveToy() {
      this.$store
        .dispatch({ type: 'saveToy', toy: this.toyToEdit })
        .then(() => {
          this.$router.push('/toy');
          this.$store.commit('setMsg', { txt: 'Save Toy', type: 'success' });
        });
      this.toyToEdit = toyService.getEmptyToy();
    },
  },
};
</script>
