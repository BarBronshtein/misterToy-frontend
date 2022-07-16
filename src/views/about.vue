<template>
  <section class="about-page">
    <about-map />
  </section>
</template>
<script>
import aboutMap from '../components/about-map.cmp.vue';
export default {
  name: 'about',
  components: { aboutMap },
};
</script>
