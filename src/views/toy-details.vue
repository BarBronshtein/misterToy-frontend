<template>
  <section class="toy-details">
    <div class="container">
      {{ toy }}
      <router-link to="/toy">Go Back</router-link>
    </div>
  </section>
</template>

<script>
import { toyService } from '../services/toy-services.js';
export default {
  data() {
    return {
      toy: null,
    };
  },
  created() {
    const { toyId } = this.$route.params;
    if (!toyId) return this.$router.push('/toy');
    toyService.getById(toyId).then(toy => {
      this.toy = toy;
    });
  },
};
</script>
