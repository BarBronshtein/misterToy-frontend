<template>
  <article class="review-preview">{{ review }}</article>
</template>

<script>
export default {
  props: {
    review: { type: Object },
  },
  methods: {
    removeReview(reviewId) {
      this.$emit('removedReview', reviewId);
    },
  },
};
</script>
