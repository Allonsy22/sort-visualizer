<template>
  <v-app>
    <Toolbar />
    <v-main>
      <Visualizer />
      <ControlPanel />
    </v-main>
  </v-app>
</template>

<script>
import Toolbar from "@/components/Toolbar";
import Visualizer from "@/components/Visualizer";
import ControlPanel from "@/components/ControlPanel";

export default {
  name: "App",

  components: {
    Toolbar,
    Visualizer,
    ControlPanel
  },

  data: () => ({
    //
  }),

  mounted() {
    this.onWindowResize();
    this.$store.dispatch("initColumnData");
    window.addEventListener("resize", this.onWindowResize);
  },

  methods: {
    onWindowResize() {
      this.$store.dispatch("onWindowResizeHandler");
    }
  }
};
</script>
