<template>
  <section class="chat-room">
    <ul class="chat-list">
      <li v-for="msg in messages" :key="msg">{{ msg?.by }}: {{ msg?.txt }}</li>
    </ul>
    <div class="flex flex-column">
      <span v-if="typing">{{ user?.username }} is typing...</span>
      <input type="text" placeholder="type something..." />
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      type: false,
    };
  },
  created() {},
  computed: {
    user() {
      return this.$store.getters.user;
    },
    messages() {
      return this.$store.getters.messages;
    },
  },
};
</script>
