<template>
  <div :class="'alert ' + alertClass">
    {{ showMsg?.txt }}
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    alertClass() {
      return `alert-${this.showMsg?.type}`;
    },
    showMsg() {
      return this.$store.getters.getMsg;
    },
  },
};
</script>
