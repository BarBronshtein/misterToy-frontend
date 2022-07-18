<template>
  <section class="chat-room">
    <ul class="chat-list">
      <li v-for="msg in msgs" :key="msg.txt">{{ msg.from }}: {{ msg?.txt }}</li>
    </ul>
    <div class="flex flex-column">
      <span v-if="userTyping">{{ userTyping }} is typing...</span>
      <el-form @keyup.enter="sendMsg">
        <el-input
          @input="typing"
          v-model="msg.txt"
          placeholder="type something..."
        />
        <el-button @click="sendMsg" type="primary">Send</el-button>
      </el-form>
    </div>
  </section>
</template>
<script>
import { utilService } from '../services/util-service';
import {
  socketService,
  SOCKET_EMIT_SEND_MSG,
  SOCKET_EMIT_SET_TOPIC,
  SOCKET_EVENT_ADD_MSG,
  SOCKET_EMIT_SET_TYPING,
  SOCKET_EVENT_SEND_TYPING,
  SOCKET_EVENT_MSG_HISTORY,
} from '../services/socket-service';

export default {
  props: { toyId: String },
  data() {
    return {
      userTyping: null,
      msg: { from: '', txt: '' },
      msgs: [],
      topic: this.toyId,
    };
  },
  created() {
    this.bounce = utilService.debounce(this.clearTyping, 500);
    socketService.emit(SOCKET_EMIT_SET_TOPIC, this.topic);
    socketService.on(SOCKET_EVENT_ADD_MSG, this.addMsg);
    socketService.on(SOCKET_EVENT_SEND_TYPING, this.setUserTyping);
    socketService.on(SOCKET_EVENT_MSG_HISTORY, this.setMsgs);
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    // messages() {
    //   return this.$store.getters.messages;
    // },
  },
  methods: {
    setMsgs(msgs) {
      console.log(msgs);
      this.msgs = msgs || [];
    },
    setTyping() {
      socketService.emit(
        SOCKET_EMIT_SET_TYPING,
        this.user?.username || 'guest'
      );
    },
    clearTyping() {
      socketService.emit(SOCKET_EMIT_SET_TYPING, null);
    },
    typing() {
      this.setTyping();
      this.bounce();
    },
    setUserTyping(username) {
      this.userTyping = username;
    },
    addMsg(msg) {
      if (!msg.txt) return;
      this.msgs.push(msg);
    },
    sendMsg() {
      const from = this.user.username;
      this.msg.from = from;
      socketService.emit(SOCKET_EMIT_SEND_MSG, this.msg);
      this.msg = { from, txt: '' };
    },
  },
  unmounted() {
    socketService.off(SOCKET_EVENT_ADD_MSG, this.addMsg);
    socketService.off(SOCKET_EVENT_SEND_TYPING, this.setUserTyping);
    socketService.off(SOCKET_EVENT_MSG_HISTORY, this.setMsgs);
  },
};
</script>
