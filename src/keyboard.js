import React, { useReducer, useEffect } from "react";
import Key from "./Key";
import { useSynthDispatch } from "./synthcontext";
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
      return createKeyboard({
        numKeys: state.numKeys,
        octave: action.octave,
      });
    case "INCREMENT_OCTAVE":
      if (state.octave === 6) return { ...state };
      return createKeyboard({
        numKeys: state.numKeys,
        octave: state.octave + 1,
      });
    case "DECREMENT_OCTAVE":
      if (state.octave === 1) return { ...state };
      return createKeyboard({
        numKeys: state.numKeys,
        octave: state.octave - 1,
      });
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
}

const Keyboard = (props) => {
  const synthDispatch = useSynthDispatch();

  const [state, dispatch] = useReducer(
    keyboardReducer,
    { numKeys: props.numKeys, octave: props.octave },
    createKeyboard
  );

  useEffect(() => {
    synthDispatch({ type: "NOTES", playing: state.playing });
  }, [synthDispatch, state.playing]);

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
