import { Interval, Note, Range } from "@tonaljs/tonal";
import { Key } from "./Key";
import { Note as ToneNote } from "tone/build/esm/core/type/NoteUnits";
import { useMemo } from "react";

const keyTriggers = "awsedftgyhujkolp;'".split("");

const createKeys = ({
  numKeys,
  octave,
}: {
  numKeys: number;
  octave: number;
}) => {
  const startNote = `C${octave}`;
  const endNote = Note.transpose(
    startNote,
    Interval.fromSemitones(numKeys - 1)
  );
  const noteArray = Range.chromatic([startNote, endNote]).map(Note.get);

  return noteArray;
};

interface KeyboardProps {
  numKeys: number;
  octave: number;
}

export function Keyboard({ numKeys, octave }: KeyboardProps) {
  const keys = useMemo(
    () => createKeys({ numKeys, octave }),
    [numKeys, octave]
  );

  return (
    <div className="keyboard">
      <div className="keys-wrapper">
        {keys.map((note, index) => {
          return (
            <Key
              key={`key-${note.name}`}
              acc={note.acc === "b"}
              note={note.name as ToneNote}
              trigger={keyTriggers[index]}
            />
          );
        })}
      </div>
    </div>
  );
}
