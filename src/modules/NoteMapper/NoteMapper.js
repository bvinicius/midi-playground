const cromacticScale = [
    'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'
]

export class NoteMapper {
    constructor() {
        this.baseNote = 0;
        this.baseNoteName = 'C0';
    }

    mapToName(note, octaveShift = 0) {
        const tone = note % cromacticScale.length;
        const octave = parseInt(note / cromacticScale.length);
        const adjustedOctave = Math.max(this.baseNote, octave + octaveShift);
        return `${cromacticScale[tone]}${adjustedOctave}`
    }
}