import React, { useRef, useEffect, useState, useReducer } from "react";
import { useContext } from "react";
import { MonoSynth } from "tone";

const SynthContext = React.createContext();
const SynthStateContext = React.createContext();
const SynthDispatchContext = React.createContext();

function useSynthState() {
  const state = useContext(SynthStateContext);
  return state;
}

function useSynthDispatch() {
  const dispatch = useContext(SynthDispatchContext);
  return dispatch;
}

function useSynth() {
  return [useSynthState(), useSynthDispatch()];
}

function synthReducer(state, action) {
  switch (action.type) {
    case "NOTES":
      console.log("notes action");
      return {
        ...state,
        isPlaying:
          state.playing.length > 0 || action.playing.length > 0 ? true : false,
        playing: action.playing,
      };
    case "SILENCE":
      return {
        ...state,
        isPlaying: false,
      };
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
}

const SynthProvider = ({ children }) => {
  const synth = useRef();
  const [isLoaded, setLoaded] = useState(false);
  const [state, dispatch] = useReducer(synthReducer, {
    isPlaying: false,
    playing: [],
  });

  const prev = useRef([]);

  useEffect(() => {
    synth.current = new MonoSynth({
      oscillator: { type: "fatsawtooth" },
      // portamento: 0.1,
    }).toDestination();

    synth.current.onsilence = () => dispatch({ type: "SILENCE" });
    setLoaded(true);
  }, []);

  console.log(state.isPlaying);
  useEffect(() => {
    if (prev.current[0] === state.playing[0]) return;

    prev.current = state.playing;

    if (state.playing.length > 1) {
      synth.current.setNote(state.playing[0]);
    } else if (state.playing.length === 0) {
      synth.current.triggerRelease();
    } else {
      synth.current.triggerAttack(state.playing[0]);
    }
  }, [state.playing]);

  return (
    <SynthContext.Provider value={synth.current}>
      <SynthStateContext.Provider value={state}>
        <SynthDispatchContext.Provider value={dispatch}>
          {isLoaded ? children : "loading..."}
        </SynthDispatchContext.Provider>
      </SynthStateContext.Provider>
    </SynthContext.Provider>
  );
};

export {
  SynthContext,
  SynthProvider,
  useSynth,
  useSynthDispatch,
  useSynthState,
};
