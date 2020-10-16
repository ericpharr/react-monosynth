import React, { useContext, useReducer } from "react";
import Key from './Key';
import { Interval, Note, Range } from '@tonaljs/tonal'
import { SynthContext } from './synthcontext'
import { zipWith } from 'lodash/fp'

const keys = numKeys => octave => {
  const startNote = `C${octave}`
  const endNote = Note.transpose(startNote, Interval.fromSemitones(numKeys -1))
  const noteArray = Range.chromatic([startNote, endNote]).map(Note.get)
  const keyState = noteArray.map(({name, acc, midi}) => ({name, midi, acc, playing:false}))
  const keyTriggers = "awsedftgyhujkolp;".split("").map(i => ({trigger: i}))
  return zipWith((a,b) => ({...b,...a}))(keyTriggers)(keyState)
};

const keyboard = keys(17)

const keyboard = keys(18)

const Keyboard = () => {
  const synth = useContext(SynthContext)

  const handleMouseLeave = () => synth.triggerRelease()

  return (
    <div className="keyboard">
        <div className="keys-wrapper" onMouseLeave={handleMouseLeave}>
          { keyboard(2).map(note => {
            return (
              <Key
                key={note.midi}
                acc={note.acc === "b"}
                note={note.name}
                trigger={note.trigger}
              />
            )
          }) }
        </div>
    </div>
  )
};

export default Keyboard;
