import * as Tone from "tone";
import Signal from "../model/signal";
import NoteMapper from "./NoteMapper/NoteMapper";

class Synth {
  private oscillatorsMap: any = {};
  private octaveShift: number = -1;

  constructor(private noteMapper: NoteMapper) {
    this.oscillatorsMap = {};
    this.octaveShift = -1;
  }

  get now(): number {
    return Tone.now();
  }

  start({ note }: Signal) {
    const noteName = this.noteMapper.mapToName(note, this.octaveShift);
    const oscillator = new Tone.Oscillator(
      noteName,
      "sawtooth"
    ).toDestination();
    Object.assign(this.oscillatorsMap, { [noteName]: oscillator });
    this.oscillatorsMap[noteName].start();
  }

  stop({ note }: Signal) {
    const noteName = this.noteMapper.mapToName(note, this.octaveShift);
    const oscillator = this.oscillatorsMap[noteName];
    oscillator && oscillator.stop();
  }
}
export default Synth;
