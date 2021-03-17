import Vue from "vue";
import Vuex from "vuex";

import visualizer from "@/store/modules/visualizer";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    visualizer
  }
});
