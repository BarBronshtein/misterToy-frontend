<template>
  <article class="toy-preview card">
    <div class="toy-description">

      <h4>{{ toy.name }}</h4> 
      
      <p>
        <p>Price: $ {{ toy.price }}</p>
      </p>
      <p v-for="(label, i) in toy.labels" :key="i" class="uppercase">
        {{ label }}
      </p>
      <div class="actions">
        <el-button  type="primary"  >
          <router-link  :to="'/toy/details/' + toy._id"> Details</router-link>
        </el-button>
        <el-button type="warning">
          <router-link  :to="'/toy/edit/' + toy._id">Edit </router-link>
        </el-button>
        <el-button type="danger"  @click="removeToy(toy._id)">Remove</el-button>
      </div>
  </div>
      <div class="img-container">
      <img :src="toy.image" :alt="toy.name">
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
