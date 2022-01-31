import { NoteMapper } from "./NoteMapper";

test("Maps note to name with default octave", () => {
  const note = 140;
  const mapped = new NoteMapper().mapToName(note);
  expect(mapped).toBe("Ab11");
});

test("Maps note to name with one octave up", () => {
  const note = 140;
  const octaveShift = 1;
  const mapped = new NoteMapper().mapToName(note, octaveShift);
  expect(mapped).toBe("Ab12");
});
