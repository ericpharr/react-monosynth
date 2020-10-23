import React, { useContext, useReducer, useEffect, useRef } from "react";
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

const keyboardReducer = (state, action) => {
  // console.log(state, action)
  switch (action.type) {
    case "PLAY":
      return ({
        ...state,
        playing: [
          action.note,
          ...state.playing,
        ],
        keys: [
          ...state.keys.slice(0, action.index),
          {...state.keys[action.index], playing: true},
          ...state.keys.slice(action.index+1)
        ]
      })
    case "RELEASE":
      const index = state.playing.indexOf(action.note)
      return ({
        ...state,
        playing: [
          ...state.playing.slice(0, index),
          ...state.playing.slice(index+1)
        ],
        keys: [
          ...state.keys.slice(0, action.index),
          {...state.keys[action.index], playing: false},
          ...state.keys.slice(action.index+1)
        ]
      })
    default:
      throw new Error(`Unsupported action type: ${action.type}`)
  }
}

const Keyboard = () => {
  const synth = useContext(SynthContext)

  const [ state, dispatch ] = useReducer(keyboardReducer, {playing:[],keys:keyboard(2)})
  const prev = useRef([])

  useEffect(() => {
    if (prev.current[0] === state.playing[0]) return

    prev.current = state.playing

    if (state.playing.length > 1) {
      synth.setNote(state.playing[0])
    } else if (state.playing.length === 0 ) {
      synth.triggerRelease()
    } else {
      synth.triggerAttack(state.playing[0])
    }

  },[synth, state.playing])

  return (
    <div className="keyboard">
        <div className="keys-wrapper">
          { state.keys.map((note, index) => {
            return (
              <Key
                key={note.midi}
                acc={note.acc === "b"}
                note={note.name}
                trigger={note.trigger}
                dispatch={dispatch}
                index={index}
                playing={note.playing}
              />
            )
          }) }
        </div>
    </div>
  )
};

export default Keyboard;
