<template>
  <div class="visualizer-container mx-auto">
    <div
      v-for="(column, index) in columnData"
      :key="index"
      :class="['column', columnClass(index)]"
      :style="{
        width: `${columnWidth}px`,
        height: `${columnData[index]}px`
      }"
    ></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Visualizer",

  data: () => ({
    //
  }),

  computed: {
    ...mapGetters(["columnWidth", "columnData", "isSorted", "comparingIndices"])
  },

  methods: {
    columnClass(index) {
      if (this.isSorted) return "sorted";
      return this.comparingIndices.some(x => x === index) ? "comparing" : "";
    }
  }
};
</script>

<style scoped>
.visualizer-container {
  width: 95%;
  height: 200px;
  margin: 30px 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  background-color: gray;
}

.column {
  height: 150px;
  background-color: white;
  border: 1px solid black;
}

.comparing {
  background-color: purple;
}

.sorted {
  background-color: green;
}
</style>
