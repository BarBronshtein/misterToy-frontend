<template>
  <section class="toy-details">
    <div class="container">
      {{ toy }}
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
    if (toyId) this.toy = toyService.getById(toyId);
    else this.$router.push('/toy');
  },
};
</script>
