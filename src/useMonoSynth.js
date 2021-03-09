import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { MonoSynth } from "tone";
import { usePrevious } from "./usePrevious";

const monoSynthReducer = (state, action) => {
  return {
    ...state,
    oscillator: { ...state.oscillator, ...action.oscillator },
    envelope: { ...state.envelope, ...action.envelope },
    filterEnvelope: { ...state.filterEnvelope, ...action.filterEnvelope },
    filter: { ...state.filter, ...action.filter },
  };
};

export const useMonoSynth = (params = {}) => {
  const [state, dispatch] = useReducer(monoSynthReducer, {});
  const [isLoaded, setLoaded] = useState(false);
  const [gate, setGate] = useState(false);
  const [note, setNote] = useState();
  const [isSilent, setSilent] = useState(true);
  const prevGate = usePrevious(gate);
  const synth = useRef();
  const setEnvelope = (params) => dispatch({ envelope: params });
  const setFilter = (params) => dispatch({ filter: params });
  const setFilterEnvelope = (params) => dispatch({ filterEnvelope: params });
  const setOscillator = (params) => dispatch({ oscillator: params });
  const setPortamento = (value) => dispatch({ portamento: value });

  const onSilence = useCallback(() => setSilent(true), []);

  useEffect(() => {
    synth.current = new MonoSynth().toDestination();
    synth.current.set(params);
    synth.current.onsilence = onSilence;
    dispatch(synth.current.get());
    setLoaded(true);
    return () => synth.current.dispose();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    synth.current.set(state);
  }, [state]);

  useEffect(() => {
    if (isLoaded) {
      state.oscillator.type.substr(0, 2) === "am" &&
        state.oscillator.modulationType === undefined &&
        dispatch({ oscillator: synth.current.oscillator.get() });

      state.oscillator.type.substr(0, 3) === "fat" &&
        state.oscillator.count === undefined &&
        dispatch({ oscillator: synth.current.oscillator.get() });

      state.oscillator.type.substr(0, 2) === "fm" &&
        state.oscillator.modulationIndex === undefined &&
        dispatch({ oscillator: synth.current.oscillator.get() });

      state.oscillator.type === "pulse" &&
        state.oscillator.width === undefined &&
        dispatch({ oscillator: synth.current.oscillator.get() });

      state.oscillator.type === "pwm" &&
        state.oscillator.modulationFrequency === undefined &&
        dispatch({ oscillator: synth.current.oscillator.get() });
    }
  }, [isLoaded, state]);

  useEffect(() => {
    console.log(`gate is ${gate ? "on" : "off"}`);
    gate && setSilent(false);
  }, [gate, isSilent]);

  useEffect(() => {
    gate && !prevGate && synth.current.triggerAttack(note);
    gate && prevGate && synth.current.setNote(note);
    !gate && prevGate && synth.current.triggerRelease();
  }, [gate, note, prevGate]);

  return {
    ...state,
    synth: synth.current,
    setGate,
    note,
    setNote,
    setEnvelope,
    setFilter,
    setFilterEnvelope,
    setOscillator,
    setPortamento,
    isLoaded,
    isSilent,
  };
};
