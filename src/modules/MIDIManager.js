import MIDIService from './MIDIService';

class MIDIManager {
    constructor() {
        this.listenToMidi();
        this.activeSignals = [];
    }

    addSignal(signal) {
        this.activeSignals.push(signal)
    }

    removeSignal(signal) {
        this.activeSignals = this.activeSignals.filter(({ note }) => note === signal.note);
    }

    listenToMidi() {
        MIDIService.onSignalOn.subscribe((signal) => {
            this.addSignal(signal);
        });
        MIDIService.onSignalOff.subscribe((signal) => {
            this.removeSignal(signal);
        });
    }
}
export default new MIDIManager();
