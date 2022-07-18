import { messageService } from '../../services/message-service';
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

    addMessages(state, { messages }) {
      state.messagess.push(messages);
    },
  },
  actions: {
    async loadMessages({ commit }) {
      try {
        const reviews = await reviewService.query({ toyId });
        commit({ type: 'setReviews', reviews });
      } catch (err) {
        console.error(err);
      }
    },
    async addMessage({ commit, dispatch }, { review }) {
      try {
        const newReview = await reviewService.add(review);
        await commit('addReview', { review: newReview });
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
