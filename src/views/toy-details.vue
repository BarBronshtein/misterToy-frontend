<template>
  <section v-if="toy" class="toy-details text-center">
    <img :src="toy.image" alt="toy.name" />
    <div class="toy-details-description">
      <h2>{{ toy.name }}</h2>
      <p>Price: ${{ toy.price }}</p>
      <p v-for="label in toy.labels" :key="label">{{ label }}</p>
      <span>Published: {{ timeAgo }}</span>
    </div>
    <div class="reviews">
      <review-list v-if="toy.reviews?.length" :reviews="toy.reviews" />
      <el-button @click="addReview">Add review</el-button>
    </div>
    <router-link to="/toy"> Go Back</router-link>
  </section>
</template>

<script>
import reviewList from '../components/review-list.cmp.vue';
import { toyService } from '../services/toy-service.js';
import { utilService } from '../services/util-service.js';
export default {
  data() {
    return {
      toy: null,
    };
  },
  created() {
    const { toyId } = this.$route.params;
    if (!toyId) return this.$router.push('/toy');
    toyService.getById(toyId).then(toy => {
      this.toy = toy;
    });
  },
  methods: {
    addReview() {
      return;
    },
  },
  computed: {
    timeAgo() {
      return utilService.timeAgo(this.toy.createdAt);
    },
  },
  components: { reviewList },
};
</script>
