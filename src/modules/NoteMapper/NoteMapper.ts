const cromacticScale: string[] = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
];

export default class NoteMapper {
  private BASE_NOTE = 0;

  /**
   * Returns a string representing a musical note with its octave given by the integer note and its octaveShift passed as parameters.
   * @param {number} note
   * @param {number} octaveShift
   * @returns
   */
  mapToName(note: number, octaveShift = 0): string {
    const tone = note % cromacticScale.length;
    const octave = Math.floor(note / cromacticScale.length);
    const adjustedOctave = Math.max(this.BASE_NOTE, octave + octaveShift);
    return `${cromacticScale[tone]}${adjustedOctave}`;
  }
}
