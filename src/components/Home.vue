<template>
  <div>
    <h3>MIDI</h3>

    <div>Type: {{ type }}</div>
    <div>Note: {{ note }}</div>
    <div>Velocity: {{ velocity }}</div>

    <div class="signals-container">
      <div v-for="notes in notes" class="signal" v-bind:key="note">
        <div :class="[isActive(signal) ? 'on' : 'off']"></div>
      </div>
    </div>
  </div>
</template>

<script>
import MIDIService from "../modules/MIDIService";
import MIDIMessageType from "../modules/enum/MIDIMessageType";
import MIDIManager from "../modules/MIDIManager";

export default {
  name: "Home",
  data: () => ({
    midi: {},
    midimap: {},
    lastKey: null,
    maxSignalsLength: 61,
    initialSignalsIndex: 36,
  }),
  mounted: function () {
    this.subscribeToMIDI();
  },
  computed: {
    type: function () {
      return this.lastKey ? MIDIMessageType.toString(this.lastKey.type) : "";
    },
    note: function () {
      return this.lastKey ? this.lastKey.note : "";
    },
    velocity: function () {
      return this.lastKey ? this.lastKey.velocity : "";
    },
    signals() {
      return [...Array(this.maxSignalsLength).keys()]
        .map((index) => index + this.initialSignalsIndex)
        .map((signal) => ({
          class: this.isActive(signal) ? "on" : "off",
        }));
    },
  },
  methods: {
    subscribeToMIDI: async function () {
      await MIDIService.requestMIDIAccess();
      MIDIService.onMIDIMessage.subscribe((messageData) => {
        this.lastKey = messageData;
      });
      MIDIService.onSignalOn.subscribe(() => {
        this.keyPressed = true;
      });
      MIDIService.onSignalOff.subscribe(() => {
        this.keyPressed = false;
      });
    },

    onMIDIMessage: function (message) {
      this.lastKey = message;
    },

    isActive(signal) {
      return MIDIManager.activeSignals.map(({ note }) => note).includes(signal);
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

.signal .on {
  background-color: "black";
}

.signal .on {
  background-color: "bleu";
}
</style>
