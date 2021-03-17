<template>
  <div class="panel-container">
    <v-btn
      v-if="!isPlay"
      @click="start"
      key="play"
      class="ma-1"
      :disabled="isSorted"
    >
      <v-icon>mdi-play</v-icon>
    </v-btn>
    <v-btn v-else @click="pause" key="pause" :disabled="isSorted">
      <v-icon>mdi-pause</v-icon>
    </v-btn>
    <v-btn :disabled="isActiveNext || isSorted" @click="nextStep">Next</v-btn>
    <v-col cols="4" sm="2">
      <v-select
        v-model="currentSpeed"
        :items="speed"
        item-text="text"
        item-values="value"
        :disabled="isSorted"
        @change="onSpeedChange"
      ></v-select>
    </v-col>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ControlPanel",

  data: () => ({
    currentSpeed: { text: "x1.0", value: 500 },
    speed: [
      { text: "x1.0", value: 500 },
      { text: "x2.0", value: 250 },
      { text: "x4.0", value: 125 },
      { text: "x8.0", value: 62 },
      { text: "x16.0", value: 31 },
      { text: "x32.0", value: 15 },
      { text: "x64.0", value: 7 }
    ]
  }),

  computed: {
    ...mapGetters(["steps", "isActiveNext", "isPlay", "isSorted"])
  },

  methods: {
    ...mapActions(["start", "nextStep", "pause"]),
    onSpeedChange() {
      this.$store.dispatch("changeSpeed", this.currentSpeed);
    }
  }
};
</script>

<style scoped>
.panel-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.select {
  width: 50px;
}
</style>
