<template>
  <header class="app-header">
    <nav class="main-nav">
      <a @click="logout">{{ this.user ? 'logout' : 'login' }}</a> |
      <router-link to="/home">Home</router-link> |
      <router-link to="/toy"> To App</router-link> |
      <router-link to="/about"> About</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'appHeader',
  created() {
    this.$store.dispatch({ type: 'loadToys' });
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    logout() {
      if (this.user) {
        this.$store.dispatch({ type: 'logout' });
      }
      this.$router.push('/');
    },
  },
};
</script>
