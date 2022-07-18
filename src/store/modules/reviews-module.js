import { reviewService } from '../../services/review-service';
export default {
  state: {
    reviews: null,
    filterBy: {},
  },
  getters: {
    reviews({ reviews }) {
      return reviews;
    },
    filterReviews({ filterBy }) {
      return JSON.parse(JSON.stringify(filterBy));
    },
  },
  mutations: {
    setReviews(state, { reviews }) {
      state.reviews = reviews;
    },
    removeReview(state, { reviewId }) {
      const idx = state.reviews.findIndex(review => review._id === reviewId);
      state.reviews.splice(idx, 1);
    },
    addReview(state, { review }) {
      state.reviews.unshift(review);
    },
    setFilterBy(state, { filterBy }) {
      state.filterBy = filterBy;
    },
  },
  actions: {
    async loadReviews({ commit }, { toyId }) {
      // commit({ type: 'setFilterBy' }, { filterBy });
      try {
        const reviews = await reviewService.query({ toyId });
        commit({ type: 'setReviews', reviews });
      } catch (err) {
        console.error(err);
      }
    },
    async removeReview({ dispatch, commit }, { reviewId }) {
      try {
        await reviewService.remove(reviewId);
        commit({ type: 'removeReview', reviewId });
        dispatch({
          type: 'showMsg',
          msg: { txt: 'Removed review successfuly', type: 'success' },
        });
      } catch (err) {
        console.log(err);
        console.error('Sorry ty again later');
        dispatch({
          type: 'showMsg',
          msg: { txt: 'Failed to remove Review', type: 'error' },
        });
      }
    },
    async addReview({ commit, dispatch }, { review }) {
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
