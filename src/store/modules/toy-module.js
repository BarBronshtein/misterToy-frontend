import { toyService } from '../../services/toy-services';

export default {
  state: {
    toys: null,
    sortBy: { state: 1, status: '' },
    filterBy: null,
    page: { numPages: 0, curPage: 0, pageSize: 4 },
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
    filterBy({ filterBy }) {
      return JSON.parse(JSON.stringify(filterBy));
    },
    toysToDisplay({ toys }) {
      return JSON.parse(JSON.stringify(toys));
    },
  },
  mutations: {
    setToys(state, { toys }) {
      state.toys = toys;
      state.page.numPages = toys.length / state.page.pageSize;
    },
    removeToy(state, { toyId }) {
      const idx = state.toys.findIndex(toy => toy._id === toyId);
      if (idx !== -1) state.toys.splice(idx, 1);
    },
    addToy(state, { toy }) {
      state.toys.push(toy);
    },
    updateToy(state, { toy }) {
      const idx = state.toys.findIndex(toy => toy._id === toyId);
      if (idx !== -1) state.toys.splice(idx, 1, toy);
    },
    setFilterBy(state, { filterBy }) {
      state.filterBy = filterBy;
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
    async loadToys(
      { commit, state: { sortBy } },
      { filterBy = { txt: '', inStock: true, labels: [] } }
    ) {
      commit({ type: 'setFilterBy', filterBy });
      try {
        const toys = await toyService.query(filterBy, sortBy);
        commit({ type: 'setToys', toys });
      } catch (err) {
        console.log(err);
        console.error('Sorry try again later');
      }
    },
    async removeToy({ commit }, { toyId }) {
      try {
        await toyService.remove(toyId);
        commit({ type: 'removeToy', toyId });
      } catch (err) {
        console.error('Sorry try again later');
      }
    },
    async saveToy({ commit }, { toy }) {
      const type = toy._id ? 'updateToy' : 'addToy';
      try {
        const toy = await toyService.save(toy);
        commit({ type, toy });
      } catch (err) {
        console.error(err);
      }
    },
  },
};
