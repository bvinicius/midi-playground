import MIDIService from './MIDIService';
import { merge, Subject } from "rxjs";
import MIDIMessageType from './enum/MIDIMessageType';

class MIDIManager {
    constructor() {
        this.midiService = new MIDIService();
        this._subjects = {
            'onSignalOn': new Subject(),
            'onSignalOff': new Subject(),
            'onPitchWheel': new Subject()
        };
        this.midiService.onMIDISignal.subscribe(signal => this.emitSignal(signal))
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

    emitSignal(signal) {
        const { type } = signal;
        switch (type) {
            case MIDIMessageType.ON: this.onSignalOn.next(signal); break;
            case MIDIMessageType.OFF: this.onSignalOff.next(signal); break;
            case MIDIMessageType.PITCH_WHEEL: this.onPitchWheel.next(signal); break;
        }
    }

}
export default MIDIManager;
