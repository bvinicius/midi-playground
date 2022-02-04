import { Subject } from "rxjs";
import Signal from "../model/signal";
import MIDIMessageType from "./enum/MIDIMessageType";
class MIDIService {
  public onMIDISignal: Subject<Signal>;
  constructor() {
    this._listenMIDISignals();
    // this._listenKeyboardSignals();
    this.onMIDISignal = new Subject();
  }

  async _listenMIDISignals() {
    const midi = await window.navigator.requestMIDIAccess();
    Object.values(midi.inputs).forEach((input) => {
      input.onmidimessage = this._onMIDIMessage.bind(this);
    });
    return midi;
  }

  _listenKeyboardSignals() {
    document.addEventListener("keydown", (event) => {
      if (event.repeat) {
        return;
      }

      const type = MIDIMessageType.ON;
      const note = event.keyCode;
      const velocity = 1;
      const signal = new Signal(type, note, velocity);
      this.onMIDISignal.next(signal);
    });

    document.addEventListener("keyup", (event) => {
      const type = MIDIMessageType.OFF;
      const note = event.keyCode;
      const velocity = 1;
      const signal = new Signal(type, note, velocity);
      this.onMIDISignal.next(signal);
    });
  }

  _onMIDIMessage(message: { data: number[] }) {
    const [type, note, velocity] = message.data;
    const signal = new Signal(type, note, velocity);
    this.onMIDISignal.next(signal);
  }
}

export default MIDIService;
