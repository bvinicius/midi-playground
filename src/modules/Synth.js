import * as Tone from "tone";
import { NoteMapper } from "./NoteMapper/NoteMapper";

class Synth {
  constructor() {
    this.noteMapper = new NoteMapper();
    this.oscillatorsMap = {};
    this.octaveShift = -1;
  }

  get now() {
    return Tone.now();
  }

  start({ note }) {
    const noteName = this.noteMapper.mapToName(note, this.octaveShift);
    const oscillator = new Tone.Oscillator(
      noteName,
      "sawtooth"
    ).toDestination();
    Object.assign(this.oscillatorsMap, { [noteName]: oscillator });
    this.oscillatorsMap[noteName].start();
  }

  stop({ note }) {
    const noteName = this.noteMapper.mapToName(note, this.octaveShift);
    const oscillator = this.oscillatorsMap[noteName];
    oscillator && oscillator.stop();
  }
}
export default Synth;
