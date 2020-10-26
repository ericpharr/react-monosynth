import { Interval, Note, Range } from "@tonaljs/tonal";
import { zipWith } from "lodash/fp";

export function createKeyboard(numKeys) {
  return (octave) => {
    const startNote = `C${octave}`;
    const endNote = Note.transpose(
      startNote,
      Interval.fromSemitones(numKeys - 1)
    );
    const noteArray = Range.chromatic([startNote, endNote]).map(Note.get);
    const keyState = noteArray.map(({ name, acc, midi }) => ({
      name,
      midi,
      acc,
      playing: false,
    }));
    const keyTriggers = "awsedftgyhujkolp;'"
      .split("")
      .map((i) => ({ trigger: i }));
    return zipWith((a, b) => ({ ...b, ...a }))(keyTriggers)(keyState);
  };
}
