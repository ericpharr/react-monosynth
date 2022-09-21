import React, {
  createContext,
  ReactChildren,
  useContext,
  useState,
} from "react";
import { OmniOscillator, OmniOscillatorOptions, OmniOscSourceType } from "tone";
import { useMonoSynth } from "./MonoSynthContext";

interface OscillatorContextValue {
  oscillator: OmniOscillatorOptions;
  setOscillator: (change: Partial<OmniOscillatorOptions>) => void;
  baseType: OscillatorType | "pwm" | "pulse";
  setBaseType: (change: OscillatorType | "pwm" | "pulse") => void;
  sourceType: OmniOscSourceType;
  setSourceType: (change: OmniOscSourceType) => void;
}

const OscillatorContext = createContext({} as OscillatorContextValue);

interface OscillatorProviderProps {
  children: ReactChildren;
}

export const OscillatorProvider = ({ children }: OscillatorProviderProps) => {
  const { synth } = useMonoSynth();
  const [oscillator, setOscillator] = useState(
    synth?.oscillator.get() ?? OmniOscillator.getDefaults()
  );
  const [baseType, setBaseType] = useState(
    synth?.oscillator.baseType || "sawtooth"
  );
  const [sourceType, setSourceType] = useState(
    synth?.oscillator.sourceType || "oscillator"
  );

  const changeOscillator = (change: Partial<OmniOscillatorOptions>) => {
    const options = synth?.oscillator.set(change);
    setOscillator((oscillator) => ({ ...oscillator, ...options?.get() }));
    setBaseType(options?.baseType ?? "sawtooth");
    setSourceType(options?.sourceType ?? "oscillator");
  };

  const changeBaseType = (change: OscillatorType | "pwm" | "pulse") => {
    if (synth) {
      synth.oscillator.baseType = change;
    }
    const update = synth?.oscillator.get();
    setOscillator((osc) => ({ ...osc, ...update }));
    setBaseType(synth?.oscillator.baseType ?? "sawtooth");
    setSourceType(synth?.oscillator.sourceType ?? "oscillator");
  };

  const changeSourceType = (change: OmniOscSourceType) => {
    if (synth) {
      synth.oscillator.sourceType = change;
    }
    const update = synth?.oscillator.get();
    setOscillator((osc) => ({ ...osc, ...update }));
    setSourceType(synth?.oscillator.sourceType || "oscillator");
    setBaseType(synth?.oscillator.baseType || "sawtooth");
  };

  return (
    <OscillatorContext.Provider
      value={{
        oscillator: oscillator,
        setOscillator: changeOscillator,
        baseType,
        setBaseType: changeBaseType,
        sourceType,
        setSourceType: changeSourceType,
      }}
    >
      {children}
    </OscillatorContext.Provider>
  );
};

export function useOscillator() {
  const {
    oscillator,
    setOscillator,
    baseType,
    sourceType,
    setBaseType,
    setSourceType,
  } = useContext(OscillatorContext);

  return {
    oscillator,
    sourceType,
    baseType,
    setOscillator,
    setSourceType,
    setBaseType,
  };
}
