import { msgService } from '../../services/msg-service';
export default {
  state: {
    messages: null,
  },
  getters: {
    messages({ messages }) {
      return messages;
    },
  },
  mutations: {
    setMessages(state, { messages }) {
      state.messages = messages;
    },

    addMsg(state, { msg }) {
      state.messagess.push(msg);
    },
  },
  actions: {
    async loadMessages({ commit }) {
      try {
        const messages = await messageService.query({ toyId });
        commit({ type: 'setMessages', messages });
      } catch (err) {
        console.error(err);
      }
    },
    async addMsg({ commit, dispatch }, { msg }) {
      try {
        const newMsg = await msgService.add(msg);
        await commit('addReview', { msg: newMsg });
        dispatch({
          type: 'showMsg',
          msg: { txt: 'Added review successfuly', type: 'success' },
        });
      } catch (err) {
        console.error(err);
        dispatch({ type: 'showMsg', msg: { txt: 'Failed to add review' } });
      }
    },
  },
};
