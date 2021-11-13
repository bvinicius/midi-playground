import { Subject } from "rxjs";

class MIDIService {

  constructor() {
    this._subjects = {
      'onNoteOn': new Subject(),
      'onNoteOff': new Subject(),
      'onPitchWheel': new Subject()
    };
    this.requestMIDIAccess();
  }

  get onNoteOn() {
    return this._subjects['onNoteOn'];
  }

  get onNoteOff() {
    return this._subjects['onNoteOff'];
  }

  get onPitchWheel() {
    return this._subjects['onPitchWheel'];
  }

  async requestMIDIAccess() {
    const midi = await navigator.requestMIDIAccess();
    for (var input of midi.inputs.values()) {
      input.onmidimessage = (message) => this._onMIDIMessage(message);
    }
    return midi;
  }

  _onMIDIMessage(message) {
    const [type, note, velocity] = message.data;
    const dataObject = { type, note, velocity };
    console.log(dataObject);
  }
}

export default new MIDIService();