import { toyService } from '../../services/toy-services';

export default {
  state: {
    toys: null,
  },
  getters: {
    toysToDisplay({ toys }) {
      return toys;
    },
  },
  mutations: {
    setToys(state, { toys }) {
      state.toys = toys;
    },
    removeToy(state, { id }) {
      const idx = state.toys.findIndex(toy => toy._id === id);
      state.toys.splice(idx, 1);
    },
    saveToy(state, { toy }) {
      const idx = state.toys.findIndex(curToy => curToy._id === toy._id);
      if (idx !== -1) state.toys.splice(idx, 1, toy);
      else state.toys.push(toy);
    },
  },
  actions: {
    loadToys({ commit }) {
      toyService.query().then(toys => {
        commit({ type: 'setToys', toys });
      });
    },
    removeToy({ commit }, { id }) {
      toyService.remove(id).then(() => {
        commit({ type: 'removeToy', id });
      });
    },
    saveToy({ commit }, { toy }) {
      toyService.save(toy).then(toy => {
        commit({ type: 'saveToy', toy });
      });
    },
  },
};