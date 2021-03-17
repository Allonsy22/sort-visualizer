<template>
  <v-toolbar dense max-height="50">
    <v-toolbar-title class="subtitle-1">
      <v-img width="30" height="30" :src="sortImage"></v-img>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-col cols="4" sm="2">
      <v-select
        v-model="algorithm"
        :items="algorithms"
        item-text="text"
        item-values="value"
        hide-details
        @change="setAlgorithm"
      ></v-select>
    </v-col>

    <v-col cols="4" sm="2">
      <v-select
        v-model="size"
        :items="sizes"
        item-text="text"
        item-values="value"
        hide-details
        @change="setColumnCount"
      ></v-select>
    </v-col>

    <v-btn icon @click="restart">
      <v-icon>mdi-restart</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: "Toolbar",

  data: () => ({
    algorithm: { text: "Bubble sort", value: 0 },
    algorithms: [
      { text: "Bubble sort", value: 0 },
      { text: "Selection sort", value: 1 },
      { text: "Insertion sort", value: 2 },
      { text: "Merge sort", value: 3 },
      { text: "Quick sort", value: 4 }
    ],
    size: { text: "10", value: 10 },
    sizes: [
      { text: "10", value: 10 },
      { text: "20", value: 20 },
      { text: "50", value: 50 },
      { text: "100", value: 100 },
      { text: "150", value: 150 }
    ],
    sortImage: require("@/assets/sort.png")
  }),

  methods: {
    setAlgorithm() {
      this.$store.dispatch("setAlgorithm", this.algorithm);
    },
    setColumnCount() {
      this.$store.dispatch("setColumnCount", this.size);
    },
    restart() {
      this.$store.dispatch("restart");
    }
  }
};
</script>

<style scoped></style>
