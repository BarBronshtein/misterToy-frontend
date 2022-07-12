import { toyService } from '../../services/toy-services';

export default {
  state: {
    toys: null,
    sortBy: { state: 1, status: '' },
    page: { numPages: null, curPage: 0 },
    pageSize: 5,
  },
  getters: {
    toysPerLabel({ toys }) {
      if (!toys) return;
      let obj = {};
      toys.forEach(toy => {
        toy.labels.forEach(label => {
          obj[label] = obj[label] ? obj[label] + 1 : 1;
        });
      });
      return obj;
    },
    toysPricePerLabel({ toys }) {
      if (!toys) return;
      let objMap = {};
      toys.forEach(toy => {
        toy.labels.forEach(label => {
          objMap[label] = objMap[label] ? objMap[label] + 1 : 1;
        });
      });

      let obj = {};
      toys.forEach(toy => {
        toy.labels.forEach((label, i) => {
          if (!obj[label]) obj[label] = toy.price / objMap[label];
          else obj[label] += toy.price / objMap[label];
        });
      });
      return obj;
    },
    toysToDisplay({ toys, sortBy }) {
      let toysCopy = JSON.parse(JSON.stringify(toys));
      const { state, status } = sortBy;
      if (status)
        toysCopy = toysCopy.sort(
          (a, b) =>
            (status === 'date' && (a.createdAt - b.createAt) * state) ||
            (status === 'name' && a.name.localeCompare(b.name) * state) ||
            (status === 'price' && (a.price - b.price) * state)
        );

      // TODO : complete pagination
      return toysCopy;
    },
  },
  mutations: {
    setToys(state, { toys }) {
      state.toys = toys;
    },
    removeToy(state, { toyId }) {
      const idx = state.toys.findIndex(toy => toy._id === toyId);
      state.toys.splice(idx, 1);
    },
    saveToy(state, { toy }) {
      const idx = state.toys.findIndex(curToy => curToy._id === toy._id);
      if (idx !== -1) state.toys.splice(idx, 1, toy);
      else state.toys.push(toy);
    },
    setPage(state, { diff }) {
      if (!state.page.numPages) return;
      state.page.curPage += diff;
      if (state.page.curPage < 0) state.page.curPage = state.page.numPages;
      if (state.page.curPage > state.page.numPages) state.page.curPage = 0;
    },

    sort(state, { status }) {
      if (state.sortBy.status === status) state.sortBy.state *= -1;
      else state.sortBy.state = 1;
      state.sortBy.status = status;
    },
  },
  actions: {
    loadToys({ commit }) {
      toyService.query({ inStock: true }).then(toys => {
        commit({ type: 'setToys', toys });
      });
    },
    filter({ commit }, { filterBy }) {
      toyService.query(filterBy).then(toys => {
        commit({ type: 'setToys', toys });
      });
    },
    removeToy({ commit }, { toyId }) {
      toyService.remove(toyId).then(() => {
        commit({ type: 'removeToy', toyId });
      });
    },
    saveToy({ commit }, { toy }) {
      toyService.save(toy).then(toy => {
        commit({ type: 'saveToy', toy });
      });
    },
  },
};
