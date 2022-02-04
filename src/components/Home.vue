<template>
  <div>
    <h3>MIDI</h3>
    <Synth />
  </div>
</template>

<script lang="ts">
import Synth from "./SynthComponent.vue";
import Vue from "vue";

export default Vue.extend({
  name: "Home",
  components: { Synth },
});
</script>

<style scoped>
.signals-container {
  display: flex;
  justify-content: center;
}
.signal {
  width: 10px;
  height: 50px;
  margin-right: 2px;
  border: 1px solid #808080;
}

.off {
  background-color: #fff;
}

.on {
  background-color: #808080;
}
</style>
