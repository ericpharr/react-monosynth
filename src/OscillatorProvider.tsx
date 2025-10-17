import { useState } from "react";
import { useMonoSynth } from "./MonoSynthContext";
import {
  OscillatorContext,
  type OscillatorProviderProps,
} from "./OscillatorContext";
import {
  OmniOscillator,
  type OmniOscillatorOptions,
  type OmniOscSourceType,
} from "tone";

export const OscillatorProvider = ({ children }: OscillatorProviderProps) => {
  const { synth } = useMonoSynth();
  const [oscillator, setOscillator] = useState(
    synth?.oscillator.get() ?? OmniOscillator.getDefaults(),
  );
  const [baseType, setBaseType] = useState(
    synth?.oscillator.baseType || "sawtooth",
  );
  const [sourceType, setSourceType] = useState(
    synth?.oscillator.sourceType || "oscillator",
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
