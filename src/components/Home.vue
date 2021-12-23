<template>
  <div>
    <h3>MIDI</h3>

    <div>Type: {{ lastType }}</div>
    <div>Note: {{ lastNote }}</div>
    <div>Velocity: {{ lastVelocity }}</div>

    <synth-component />
  </div>
</template>

<script>
import MIDIMessageType from "../modules/enum/MIDIMessageType";
import MIDIManager from "../modules/MIDIManager";
import Player from "../modules/Synth";
import SynthComponent from "./SynthComponent.vue";

export default {
  name: "Home",
  components: { SynthComponent },
  data: () => ({
    midi: {},
    midimap: {},
    lastKey: null,
    maxSignalsLength: 61,
    initialSignalsIndex: 36,
    midiManager: new MIDIManager(),
    signals: {},
  }),
  computed: {
    lastType: function () {
      return this.lastKey ? MIDIMessageType.toString(this.lastKey.type) : "";
    },
    lastNote: function () {
      return this.lastKey ? this.lastKey.note : "";
    },
    lastVelocity: function () {
      return this.lastKey ? this.lastKey.velocity : "";
    },
    signalsArray() {
      return [...Array(this.maxSignalsLength).keys()]
        .map((index) => index + this.initialSignalsIndex)
        .map((note) => this.signals[note] || { note });
    },
  },
  mounted: function () {},
  methods: {
    subscribeToMIDI: async function () {
      this.midiManager.onMIDIMessage.subscribe((messageData) => {
        this.lastKey = messageData;
      });
      this.midiManager.onSignalOn.subscribe((signal) => {
        this.onSignalOn(signal);
      });
      this.midiManager.onSignalOff.subscribe((signal) => {
        this.onSignalOff(signal);
      });
    },

    isActive(signal) {
      return MIDIManager.activeSignals.map(({ note }) => note).includes(signal);
    },

    onSignalOn(signal) {
      const { note } = signal;
      this.signals[note] = { ...signal, on: true };
      this.signals = { ...this.signals };
    },

    onSignalOff(signal) {
      const { note } = signal;
      this.signals[note] = { ...signal, on: false };
      this.signals = { ...this.signals };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
