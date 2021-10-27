import { createStore } from 'vuex';
import domainDetail from './../../domain-detail.json';

export default createStore({
  state: {
    domainDetail,
    verboseView: true,
    showPassword: false,
    password: 'secret password',
  },
  mutations: {
    changeVerbose: function(state, verboseView) {
      state.verboseView = !state.verboseView;
      return verboseView;
    },
    showPassword: function(state, showPassword) {
      state.showPassword = !state.showPassword;
      return showPassword;
    },
  },
  actions: {},
  modules: {},
});
