import React, { useReducer, useEffect } from "react";
import Key from "./Key";
import { createKeyboard } from "./keyboard-helpers";
import OctaveSelect from "./octave-select";

function keyboardReducer(state, action) {
  switch (action.type) {
    case "PLAY":
      return {
        ...state,
        playing: [action.note, ...state.playing],
        keys: [
          ...state.keys.slice(0, action.index),
          { ...state.keys[action.index], playing: true },
          ...state.keys.slice(action.index + 1),
        ],
      };
    case "RELEASE":
      const index = state.playing.indexOf(action.note);
      return {
        ...state,
        playing: [
          ...state.playing.slice(0, index),
          ...state.playing.slice(index + 1),
        ],
        keys: [
          ...state.keys.slice(0, action.index),
          { ...state.keys[action.index], playing: false },
          ...state.keys.slice(action.index + 1),
        ],
      };
    case "CHANGE_OCTAVE":
      if (action.octave < 1 || action.octave > 6) return { ...state };
      return createKeyboard({
        numKeys: state.numKeys,
        octave: action.octave,
      });
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
}

const Keyboard = (props) => {
  const [state, dispatch] = useReducer(
    keyboardReducer,
    { numKeys: props.numKeys, octave: props.octave },
    createKeyboard
  );

  useEffect(() => {
    props.setGate(state.playing.length > 0);
    props.setNote(state.playing[0] || props.note);
  });

  return (
    <>
      <OctaveSelect
        decrementKey="z"
        incrementKey="x"
        currentOctave={state.octave}
        dispatch={dispatch}
      />
      <div className="keyboard">
        <div className="keys-wrapper">
          {state.keys.map((note, index) => {
            return (
              <Key
                key={index}
                acc={note.acc === "b"}
                note={note.name}
                trigger={note.trigger}
                dispatch={dispatch}
                index={index}
                playing={note.playing}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Keyboard;
