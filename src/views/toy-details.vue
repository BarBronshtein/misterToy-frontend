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
      <review-list
        v-if="reviews?.length"
        :reviews="reviews"
        @removeReview="removeReview"
      />
      <el-button @click="addReview">Add review</el-button>
    </div>
    <router-link to="/toy"> Go Back</router-link>
  </section>
  <chat-room v-if="toy" :msgs="toy.msgs" :toyId="toy._id" />
  <div v-if="showLoginForm" class="modal">
    <el-button @click="closeForm">X</el-button>
    <login-form @formSubmited="closeForm" />
  </div>
</template>

<script>
import reviewList from '../components/review-list.cmp.vue';
import loginForm from '../components/login-form.cmp.vue';
import { toyService } from '../services/toy-service.js';
import { utilService } from '../services/util-service.js';
import chatRoom from '../components/chat-room.cmp.vue';
export default {
  data() {
    return {
      toy: null,
      showLoginForm: false,
      filterBy: {},
    };
  },
  created() {
    const { toyId } = this.$route.params;
    if (!toyId) return this.$router.push('/toy');
    toyService.getById(toyId).then(toy => {
      this.toy = toy;
    });
    this.$store.dispatch({ type: 'loadReviews', toyId });
  },
  methods: {
    addReview() {
      if (!this.user) {
        return (this.showLoginForm = true);
      }
      const review = {
        toyId: this.toy._id,
        content: 'test',
      };
      this.$store.dispatch({ type: 'addReview', review });
    },
    closeForm() {
      this.showLoginForm = false;
    },
    removeReview(reviewId) {
      this.$store.dispatch({ type: 'removeReview', reviewId });
    },
  },
  computed: {
    timeAgo() {
      return utilService.timeAgo(this.toy.createdAt);
    },
    user() {
      return this.$store.getters.user;
    },
    reviews() {
      return this.$store.getters.reviews || [];
    },
  },
  components: { reviewList, loginForm, chatRoom },
};
</script>
