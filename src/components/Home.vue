<template>
  <div>
    <span>MIDI</span>
  </div>
</template>

<script>
import MIDIService from "../modules/MIDIService";

export default {
  name: "Home",
  data: () => ({
    midi: {},
    midimap: {},
  }),
  mounted: function () {
    this.subscribeToMIDI();
  },
  methods: {
    subscribeToMIDI: function () {
      MIDIService.midiMessageSubject.subscribe((message) =>
        this.onMIDIMessage(message)
      );
    },

    onMIDIMessage: function (message) {
      console.log(message);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
