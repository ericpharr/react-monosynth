import React from "react";
import Key from './Key';
import { Interval, Note, Range } from '@tonaljs/tonal'

const keys = numKeys => octave => {
  const startNote = `C${octave}`
  const noteArray = Range.chromatic([startNote, Note.transpose(startNote, Interval.fromSemitones(numKeys -1))])

  return noteArray.map(Note.get)
}

const keyboard = keys(18)

const Keyboard = () => {

  return (
    <div className="keyboard">
        { keyboard(3).map(note => <Key key={note.midi} acc={note.acc === "b"} note={note.name} />) }
    </div>
  )
};

export default Keyboard;
