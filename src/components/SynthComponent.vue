<template>
  <div class="container">
    <div class="keys-container">
      <div class="oscillators">
        <div class="oscillator">
          <Knob />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MIDIManager from "../modules/MIDIManager";
import Synth from "../modules/Synth";
import Knob from "./Knob.vue";
export default {
  name: "SynthComponent",
  components: { Knob },
  props: {
    initialSignalsIndex: {
      type: Number,
      default: 36,
    },
    maxSignalsLength: {
      type: Number,
      default: 61,
    },
  },
  data: () => ({
    signals: {},
    midiManager: new MIDIManager(),
    synth: new Synth(),
  }),
  computed: {},
  mounted: function () {
    this.subscribeToMIDI();
  },
  methods: {
    subscribeToMIDI: async function () {
      this.midiManager.onSignalOn.subscribe(this.onSignalOn.bind(this));
      this.midiManager.onSignalOff.subscribe(this.onSignalOff.bind(this));
    },
    onSignalOn: function (signal) {
      this.synth.start(signal);
    },
    onSignalOff: function (signal) {
      this.synth.stop(signal);
    },
  },
};
</script>

<style>
.container {
  width: 90%;
  border: 1px solid black;
  margin: 20px auto 0 auto;
}

.keys-container {
  display: flex;
  justify-content: space-between;
}
.key {
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
