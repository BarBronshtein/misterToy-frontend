<template>
  <article class="toy-preview">
    <div class="card">
      <!-- <img :src="toy.photo" :alt="toy.name"> -->
      <h4>{{ toy.name }} <el-button  class="btn" @click="removeToy(toy._id)">X</el-button></h4> 
      
      <p>
        <p>Price: $ {{ toy.price }}</p>
      </p>
      <p v-for="(label, i) in toy.labels" :key="i" class="uppercase">
        {{ label }}
      </p>
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
      this.$emit('removedToy', toyId);
    },
  },
};
</script>
