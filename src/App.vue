<template>
  <router-link to="/">Home</router-link> |
  <router-link to="/toy"> To App</router-link> |
  <router-link to="/about"> About</router-link>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  created() {
    this.$store.dispatch({ type: 'loadToys' });
  },
};
</script>

<style>
@import '@/assets/base.css';
</style>
