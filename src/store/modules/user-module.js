import { authService } from '../../services/auth-service';
import { userService } from '../../services/user-service';
export const userStore = {
  state: {
    user: null,
    users: null,
  },
  mutations: {
    setUser(state, { user }) {
      state.user = user;
    },
    setUsers(state, { users }) {
      state.users = users;
    },
  },
  getters: {
    user({ user }) {
      return user;
    },
    users({ users }) {
      return users;
    },
  },
  actions: {
    async loadUsers({ commit, dispatch }) {
      try {
        const users = await userService.getUsers();
        commit({ type: 'setUsers', users });
      } catch (err) {
        console.error('Something went wrong try again later');
        dispatch({
          type: 'showMsg',
          msg: { txt: 'Failed to login', type: 'error' },
        });
      }
    },
    async loadUser({ commit }) {
      try {
        const user = await authService.getLoggedinUser();
        commit({ type: 'setUser', user });
      } catch (err) {
        console.error('Something went wrong try again later');
        dispatch({
          type: 'showMsg',
          msg: { txt: 'Failed to login', type: 'error' },
        });
      }
    },
    async logout({ commit }) {
      try {
        await authService.logout();
        commit({ type: 'setUser', user: null });
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'showMsg',
          msg: { txt: 'Failed to logout', type: 'error' },
        });
      }
    },
    async logUser({ commit, dispatch }, { action, ruleForm }) {
      try {
        const user = await authService[action](ruleForm);
        commit({ type: 'setUser', user });
      } catch (err) {
        dispatch({
          type: 'showMsg',
          msg: { txt: `Failed to ${action}`, type: 'error' },
        });
        throw new Error(err);
      }
    },
  },
};
