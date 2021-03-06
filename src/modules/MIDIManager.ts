import MIDIService from "./MIDIService";
import { merge, Subject } from "rxjs";
import MIDIMessageType from "./enum/MIDIMessageType";
import type { Signal } from "../model/signal";

interface SignalSubjects {
  onSignalOn: Subject<Signal>;
  onSignalOff: Subject<Signal>;
  onPitchWheel: Subject<Signal>;
}

class MIDIManager {
  private midiService: MIDIService;
  private subjects: SignalSubjects;

  constructor() {
    this.midiService = new MIDIService();
    this.subjects = {
      onSignalOn: new Subject(),
      onSignalOff: new Subject(),
      onPitchWheel: new Subject(),
    };

    this.midiService.onMIDISignal.subscribe((signal) =>
      this.emitSignal(signal)
    );
  }

  get onSignalOn() {
    return this.subjects.onSignalOn;
  }

  get onSignalOff() {
    return this.subjects.onSignalOff;
  }

  get onPitchWheel() {
    return this.subjects.onPitchWheel;
  }

  get onMIDIMessage() {
    return merge(this.onSignalOn, this.onSignalOff, this.onPitchWheel);
  }

  emitSignal(signal: Signal) {
    const { type } = signal;
    switch (type) {
      case MIDIMessageType.ON:
        this.onSignalOn.next(signal);
        break;
      case MIDIMessageType.OFF:
        this.onSignalOff.next(signal);
        break;
      case MIDIMessageType.PITCH_WHEEL:
        this.onPitchWheel.next(signal);
        break;
    }
  }
}
export default MIDIManager;
