<template>
  <main class="main-layout">
    <nav class="main-nav">
      <router-link to="/">Home</router-link> |
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
  },
};
</script>

<style></style>
