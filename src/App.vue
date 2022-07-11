<template>
  <div class="wrapper">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
  </div>

  <router-view />
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
@import '@/assets/base.css';
</style>
