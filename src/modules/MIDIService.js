import { Subject } from "rxjs";
import Signal from '../model/signal';
class MIDIService {

  constructor() {
    this.requestMIDIAccess();
    this.onMIDISignal = new Subject();
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
    const signal = new Signal(type, note, velocity);
    this.onMIDISignal.next(signal);
  }
}

export default MIDIService;