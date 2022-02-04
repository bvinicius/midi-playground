enum MIDIMessage {
  ON = 144,
  OFF = 128,
  PITCH_WHEEL = 224,
}

const strings = {
  [MIDIMessage.ON]: "Down",
  [MIDIMessage.OFF]: "UP",
  [MIDIMessage.PITCH_WHEEL]: "Pitch bend",
};

export function toString(messageCode: MIDIMessage) {
  return strings[messageCode];
}

export default MIDIMessage;
