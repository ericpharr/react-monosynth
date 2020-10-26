import React, { useContext, useReducer, useEffect, useRef } from "react";
import Key from "./Key";
import { SynthContext } from "./synthcontext";
import { createKeyboard } from "./keyboard-helpers";
import OctaveSelect from "./octave-select";

const keyboard = createKeyboard(18);

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
      return {
        ...state,
        playing: [],
        octave: action.octave,
        keys: [...keyboard(action.octave)],
      };
    case "INCREMENT_OCTAVE":
      if (state.octave === 6) return { ...state };
      return {
        ...state,
        playing: [],
        octave: state.octave + 1,
        keys: keyboard(state.octave + 1),
      };
    case "DECREMENT_OCTAVE":
      if (state.octave === 1) return { ...state };
      return {
        ...state,
        playing: [],
        octave: state.octave - 1,
        keys: keyboard(state.octave - 1),
      };
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
}

const Keyboard = () => {
  const synth = useContext(SynthContext);

  // const keyboard = createKeyboard(props.numKeys);

  const [state, dispatch] = useReducer(keyboardReducer, {
    octave: 2,
    playing: [],
    keys: keyboard(2),
  });
  const prev = useRef([]);

  useEffect(() => {
    if (prev.current[0] === state.playing[0]) return;

    prev.current = state.playing;

    if (state.playing.length > 1) {
      synth.setNote(state.playing[0]);
    } else if (state.playing.length === 0) {
      synth.triggerRelease();
    } else {
      synth.triggerAttack(state.playing[0]);
    }
  }, [synth, state.playing]);

  return (
    <div className="synth">
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
    </div>
  );
};

export default Keyboard;
