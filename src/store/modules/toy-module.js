import { toyService } from '../../services/toy-service';

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
    toysToDisplay({ toys, page: { curPage, pageSize } }) {
      if (!toys) return;
      const startIdx = curPage * pageSize;
      const copyToys = JSON.parse(JSON.stringify(toys));
      return copyToys.splice(startIdx, startIdx + pageSize);
    },
  },
  mutations: {
    setToys(state, { toys }) {
      state.toys = toys;
      state.page.numPages = Math.ceil(toys?.length / state.page.pageSize) - 1;
    },
    removeToy(state, { toyId }) {
      const idx = state.toys.findIndex(toy => toy._id === toyId);
      if (idx !== -1) {
        state.toys.splice(idx, 1);
        state.page.numPages =
          Math.ceil(state.toys?.length / state.page.pageSize) - 1;
      }
    },
    addToy(state, { toy }) {
      state.toys.push(toy);
      state.page.numPages =
        Math.ceil(state.toys?.length / state.page.pageSize) - 1;
    },
    updateToy(state, { toy }) {
      const idx = state.toys.findIndex(curToy => toy._id === curToy._id);
      if (idx !== -1) state.toys.splice(idx, 1, toy);
    },
    setFilterBy(state, { filterBy }) {
      state.filterBy = filterBy;
    },
    setPage(state, { diff }) {
      state.page.curPage += diff;
      if (state.page.curPage < 0)
        state.page.curPage = state.page.numPages >= 0 ? state.page.numPages : 0;
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
    async removeToy({ dispatch, commit }, { toyId }) {
      try {
        await toyService.remove(toyId);
        commit({ type: 'removeToy', toyId });
        dispatch({
          type: 'showMsg',
          msg: { txt: 'Removed toy successfuly', type: 'success' },
        });
      } catch (err) {
        console.error('Sorry try again later');
        dispatch({
          type: 'showMsg',
          msg: { txt: 'Failed to remove toy', type: 'error' },
        });
      }
    },
    async saveToy({ commit, dispatch }, { toy }) {
      const type = toy._id ? 'updateToy' : 'addToy';
      try {
        const savedToy = await toyService.save(toy);
        commit({ type, toy: savedToy });
        dispatch({
          type: 'showMsg',
          msg: { txt: type + ' successfuly', type: 'success' },
        });
      } catch (err) {
        console.error('Sorry try again later');
        dispatch({
          type: 'showMsg',
          msg: { txt: 'failed to' + type, type: 'error' },
        });
      }
    },
  },
};
