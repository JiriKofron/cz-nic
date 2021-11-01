import { createStore } from 'vuex';
import domainDetail from './../../domain-detail.json';

export default createStore({
  state: {
    domainDetail,
    verboseView: true,
  },
  mutations: {
    changeVerbose: function(state, verboseView) {
      state.verboseView = !state.verboseView;
      return verboseView;
    },
  },
  actions: {},
  modules: {},
});
