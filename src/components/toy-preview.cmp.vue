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
        <router-link  :to="'/toy/details/' + toy._id">
        <el-button  type="primary"  >
           Details
        </el-button>
           </router-link>
          <router-link v-if="user?.isAdmin" :to="'/toy/edit/' + toy._id">
        <el-button type="warning">
          Edit</el-button>
           </router-link>
        <el-button type="danger" v-if="user?.isAdmin" @click="removeToy(toy._id)">Remove</el-button>
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
  computed: {
    user(){
      return this.$store.getters.user;
    }
  },
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
