import { createContext, useContext, type ReactNode } from "react";
import { type OmniOscillatorOptions, type OmniOscSourceType } from "tone";

interface OscillatorContextValue {
  oscillator: OmniOscillatorOptions;
  setOscillator: (change: Partial<OmniOscillatorOptions>) => void;
  baseType: OscillatorType | "pwm" | "pulse";
  setBaseType: (change: OscillatorType | "pwm" | "pulse") => void;
  sourceType: OmniOscSourceType;
  setSourceType: (change: OmniOscSourceType) => void;
}

export const OscillatorContext = createContext({} as OscillatorContextValue);

export interface OscillatorProviderProps {
  children: ReactNode;
}

export function useOscillator() {
  return useContext(OscillatorContext);
}
