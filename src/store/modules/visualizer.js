import { getNumbersWithStep } from "@/utils/utils";
import {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort
} from "@/utils/sort";

const ALGORITHMS = [
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort
];
const MAX_COLUMN_HEIGHT = 150;
const MIN_COLUMN_HEIGHT = 1;
const STEP = 1;

const state = {
  columnCount: 10,
  visualizerWidth: 800,
  columnWidth: 10,
  columnData: [], // array of numbers
  algorithm: ALGORITHMS[0],
  algorithms: ALGORITHMS,
  iterator: null,
  interval: null,
  isSorted: false,
  steps: 0,
  speed: 500, // measured in ms
  comparingIndices: []
};

const mutations = {
  SET_VISUALIZER_WIDTH(state, payload) {
    state.visualizerWidth = payload;
  },
  SET_COLUMN_WIDTH(state, payload) {
    state.columnWidth = payload;
  },
  SET_COLUMN_COUNT(state, payload) {
    state.columnCount = payload;
  },
  SET_COLUMN_DATA(state, payload) {
    state.columnData = payload;
  },
  SET_ALGORITHM(state, payload) {
    state.algorithm = ALGORITHMS[payload];
  },
  SET_ITERATOR(state, payload) {
    state.iterator = payload;
  },
  SET_INTERVAL(state, payload) {
    state.interval = payload;
  },
  SET_SORTED_STATUS(state, payload) {
    state.isSorted = payload;
  },
  SET_STEPS(state, payload) {
    state.steps = payload;
  },
  SET_SPEED(state, payload) {
    state.speed = payload;
  },
  SET_COMPARING_INDICES(state, payload) {
    state.comparingIndices = payload;
  }
};

const actions = {
  onWindowResizeHandler({ dispatch, commit }) {
    commit("SET_VISUALIZER_WIDTH", window.innerWidth * 0.95);
    dispatch("setColumnWidth");
  },

  setColumnWidth({ commit, state }) {
    const count = state.columnCount;
    const totalWidth = state.visualizerWidth;
    const width = totalWidth / count;
    commit("SET_COLUMN_WIDTH", width);
  },

  setColumnCount({ dispatch, commit }, count) {
    commit("SET_COLUMN_COUNT", count);
    dispatch("setColumnWidth");
    dispatch("restart");
  },

  async initColumnData({ dispatch, commit, state }) {
    commit("SET_SORTED_STATUS", false);
    try {
      const data = await getNumbersWithStep({
        min: MIN_COLUMN_HEIGHT,
        max: MAX_COLUMN_HEIGHT,
        count: state.columnCount,
        step: STEP
      });

      commit("SET_COLUMN_DATA", data);
      dispatch("setIterator");
    } catch (error) {
      console.log(error);
    }
  },

  setAlgorithm({ dispatch, commit }, index) {
    commit("SET_ALGORITHM", index);
    dispatch("restart");
  },

  setIterator({ commit, state }) {
    if (!state.algorithm || state.columnData.length <= 0) return;
    state.algorithm.init([...state.columnData]);
    const iterator = state.algorithm.sort();
    commit("SET_ITERATOR", iterator);
  },

  changeSpeed({ dispatch, commit }, value) {
    if (value > 1000 || value < 3) return;
    commit("SET_SPEED", value);
    dispatch("pause");
    dispatch("start");
  },

  nextStep({ dispatch, commit, state }) {
    let data = state.iterator.next();
    if (data.done) {
      commit("SET_SORTED_STATUS", true);
      dispatch("stop");
      return;
    }
    const {
      currentIndex,
      nextIndex,
      isSwapped,
      swappedArray,
      steps
    } = data.value;

    if (isSwapped) {
      commit("SET_COLUMN_DATA", [...swappedArray]);
    }
    commit("SET_COMPARING_INDICES", [currentIndex, nextIndex]);
    commit("SET_STEPS", steps);
  },

  start({ dispatch, state }) {
    if (state.isSorted) return;
    state.interval = setInterval(() => {
      dispatch("nextStep");
    }, state.speed);
  },

  pause({ commit, state }) {
    clearInterval(state.interval);
    commit("SET_INTERVAL", null);
  },

  stop({ dispatch, commit }) {
    dispatch("pause");
    commit("SET_ITERATOR", null);
    commit("SET_COMPARING_INDICES", []);
  },

  restart({ dispatch }) {
    dispatch("stop");
    dispatch("initColumnData");
  }
};

const getters = {
  columnWidth: state => state.columnWidth,
  columnData: state => state.columnData,
  isSorted: state => state.isSorted,
  steps: state => state.steps,
  comparingIndices: state => state.comparingIndices,
  isActiveNext: state => !state.isSorted && state.interval !== null,
  isPlay: state => state.interval !== null
};

const visualizerModule = {
  state,
  mutations,
  actions,
  getters
};

export default visualizerModule;
