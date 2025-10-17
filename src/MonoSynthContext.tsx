import { createContext, useContext, type ReactNode } from "react";
import { MonoSynth, type MonoSynthOptions } from "tone";

export interface MonoSynthContextValue {
  synth: MonoSynth | null;
}

export const MonoSynthContext = createContext<MonoSynthContextValue>(
  {} as MonoSynthContextValue,
);

export interface MonoSynthProviderProps {
  options?: MonoSynthOptions;
  children?: ReactNode;
}

export function useMonoSynth() {
  const { synth } = useContext(MonoSynthContext);

  return { synth };
}
