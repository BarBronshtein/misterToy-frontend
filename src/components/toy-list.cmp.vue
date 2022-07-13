<template>
  <section class="toy-list">
    <ul class="clean-list">
      <li v-for="toy in toys" :key="toy._id">
        <toy-preview :toy="toy" @removedToy="$emit('removeToy', $event)" />
        <router-link :to="'/toy/edit/' + toy._id">Edit </router-link>|
        <router-link :to="'/toy/details/' + toy._id"> Details</router-link>
      </li>
    </ul>
  </section>
</template>

<script>
import toyPreview from './toy-preview.cmp.vue';
export default {
  props: ['toys'],
  components: { toyPreview },
};
</script>

<style></style>
