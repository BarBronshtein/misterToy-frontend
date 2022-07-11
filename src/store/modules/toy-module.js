import { toyService } from '../../services/toy-services';

export default {
  state: {
    toys: null,
    filterBy: { txt: '', inStock: true, labels: [] },
    sortBy: { state: 1, status: '' },
    page: { numPages: null, curPage: 0 },
    pageSize: 5,
  },
  getters: {
    toysToDisplay(state) {
      let toys = state.toys;
      if (!toys) return;
      const filterBy = state.filterBy;
      if (!filterBy.inStock) {
        toys = toys.filter(toy => !toy.inStock);
      }
      if (filterBy.labels.length) {
        toys = toys.filter(toy =>
          toy.labels.some(label => label.includes(state.filterBy.labels))
        );
      }
      const regex = new RegExp(filterBy.txt, 'i');
      toys = toys.filter(toy => regex.test(toy.name));

      if (state.sortBy.status === 'date')
        toys = toys.sort(
          (a, b) => (a.createdAt - b.createAt) * state.sortBy.state
        );
      else if (state.sortBy.status === 'name')
        toys = toys.sort(
          (a, b) => a.name.localeCompare(b.name) * state.sortBy.state
        );
      else if (state.sortBy.status === 'price')
        toys = toys.sort((a, b) => (a.price - b.price) * state.sortBy.state);
      // TODO : complete pagination
      return toys;
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
    filter(state, { filterBy }) {
      state.filterBy = filterBy;
    },
    sort(state, { sortBy }) {
      console.log(sortBy);
      if (state.sortBy.status === sortBy) state.sortBy.state *= -1;
      else state.sortBy.state = 1;
      state.sortBy.status = sortBy;
    },
  },
  actions: {
    loadToys({ commit }) {
      toyService.query().then(toys => {
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
