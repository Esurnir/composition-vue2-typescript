import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    theme: "default"
  },
  mutations: {
    SET_SALMON(state) {
      state.theme = "salmon";
    }
  },
  actions: {
    setSalmon({ commit }) {
      commit("SET_SALMON");
    }
  },
  modules: {}
});

export default store;

export function useStore() {
  return store;
}
