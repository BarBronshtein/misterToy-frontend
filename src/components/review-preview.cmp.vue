<template>
  <article class="review-preview">
    {{ review }}
    <el-button
      v-if="review?.byUser?._id === user?._id"
      @click="removeReview"
      type="danger"
      plain
      >Remove</el-button
    >
  </article>
</template>

<script>
export default {
  props: {
    review: { type: Object },
  },
  methods: {
    removeReview() {
      this.$emit('removedReview', this.review._id);
    },
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
};
</script>
