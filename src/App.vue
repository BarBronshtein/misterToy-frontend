<template>
  <main class="main-layout">
    <nav class="main-nav">
      <a href="" @click="logout">{{ this.user ? 'logout' : 'login' }}</a> |
      <router-link to="/home">Home</router-link> |
      <router-link to="/toy"> To App</router-link> |
      <router-link to="/about"> About</router-link>
    </nav>
    <router-view />
  </main>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.$store.dispatch({ type: 'loadToys' });
    this.$store.dispatch({ type: 'loadUser' });
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

<style></style>
