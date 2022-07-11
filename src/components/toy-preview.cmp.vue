<template>
  <article class="toy-preview">
    <div class="toy-container">
      <!-- <img :src="toy.photo" :alt="toy.name"> -->
      <h4>{{ toy.name }}</h4>
      <p>
        <span>{{ toy.price }}</span>
      </p>
      <span v-for="(label, i) in toy.labels" :key="i" class="text-uppercase">{{
        label
      }}</span>
      <button class="btn" @click="remove(toy._id)">X</button>
    </div>
  </article>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  props: {
    toy: { type: Object },
  },
  methods: {
    removeToy(toyId) {
      this.$emit('removeToy', toyId);
    },
  },
};
</script>
