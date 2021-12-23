<template>
  <div class="container">
    <div class="keys-container">
      <div
        v-for="signal in signalsArray"
        :key="signal.note"
        class="key"
        :class="{ on: signal.on }"
      />
    </div>
  </div>
</template>

<script>
import MIDIManager from "../modules/MIDIManager";
import Synth from "../modules/Synth";
export default {
  name: "SynthComponent",
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
  computed: {
    signalsArray() {
      return [...Array(this.maxSignalsLength).keys()]
        .map((index) => index + this.initialSignalsIndex)
        .map((note) => this.signals[note] || { note });
    },
  },
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
      const { note } = signal;
      this.signals[note] = { ...signal, on: true };
      this.signals = { ...this.signals };
    },
    onSignalOff: function (signal) {
      this.synth.stop(signal);
      const { note } = signal;
      this.signals[note] = { ...signal, on: false };
      this.signals = { ...this.signals };
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
