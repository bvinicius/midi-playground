import { merge, Subject } from "rxjs";
import MIDIMessageType from './enum/MIDIMessageType';
class MIDIService {

  constructor() {
    this._subjects = {
      'onSignalOn': new Subject(),
      'onSignalOff': new Subject(),
      'onPitchWheel': new Subject()
    };
    this.requestMIDIAccess();
  }

  get onSignalOn() {
    return this._subjects['onSignalOn'];
  }

  get onSignalOff() {
    return this._subjects['onSignalOff'];
  }

  get onPitchWheel() {
    return this._subjects['onPitchWheel'];
  }

  get onMIDIMessage() {
    return merge(this.onSignalOn, this.onSignalOff, this.onPitchWheel);
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
    this.emitSignal(dataObject);
  }

  emitSignal(messageObject) {
    const { type } = messageObject;

    switch (type) {
      case MIDIMessageType.ON: this.onSignalOn.next(messageObject); break;
      case MIDIMessageType.OFF: this.onSignalOff.next(messageObject); break;
      case MIDIMessageType.PITCH_WHEEL: this.onPitchWheel.next(messageObject); break;
    }
  }
}

export default new MIDIService();