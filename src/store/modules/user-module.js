import { authService } from '../../services/auth-service';
export const userStore = {
  state: {
    user: null,
  },
  mutations: {
    setUser(state, { user }) {
      state.user = user;
    },
  },
  getters: {
    user({ user }) {
      return user;
    },
  },
  actions: {
    async loadUser({ commit }) {
      try {
        const user = await authService.getLoggedinUser();
        commit({ type: 'setUser', user });
      } catch (err) {
        console.error('Something went wrong try again later');
      }
    },
    async logout({ commit }) {
      try {
        await authService.logout();
        commit({ type: 'setUser', user: null });
      } catch (err) {
        console.error(err);
      }
    },
  },
};
