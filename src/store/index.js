import { createStore } from 'vuex';
import toyStore from './modules/toy-module.js';
import { userStore } from './modules/user-module.js';

const store = createStore({
  strict: true,
  state: { msg: null },
  mutations: {
    setMsg(state, { msg }) {
      state.msg = msg;
      console.log(msg);
    },
    clearMsg(state) {
      state.msg = null;
    },
  },
  getters: {
    getMsg({ msg }) {
      return msg;
    },
  },
  actions: {
    showMsg({ commit }, { msg }) {
      console.log(msg);
      commit({ type: 'setMsg', msg });
      setTimeout(commit.bind(null, { type: 'clearMsg' }), 2000);
    },
  },
  modules: {
    toyStore,
    userStore,
  },
});

export default store;
