<template>
  <section class="review-list">
    <ul class="clean-list">
      <li v-for="review in reviews" :key="review._id">
        <review-preview
          :review="review"
          @removedReview="$emit('removeReview', $event)"
        />
      </li>
    </ul>
  </section>
</template>

<script>
import reviewPreview from './review-preview.cmp.vue';
export default {
  props: ['reviews'],
  components: { reviewPreview },
};
</script>

<style></style>
