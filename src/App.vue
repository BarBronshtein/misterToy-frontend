<template>
  <main class="main-layout">
    <app-header />
    <router-view />
    <user-msg />
  </main>
</template>

<script>
import userMsg from './components/user-msg.cmp.vue';
import appHeader from './components/app-header.cmp.vue';
export default {
  name: 'App',
  components: { appHeader, userMsg },
};
</script>
