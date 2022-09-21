import { useContext, useState } from "react";
import { useEffect, createContext, useRef, ReactChildren } from "react";
import { MonoSynth, MonoSynthOptions } from "tone";

interface MonoSynthContextValue {
  synth: MonoSynth | null;
}

export const MonoSynthContext = createContext<MonoSynthContextValue>(
  {} as MonoSynthContextValue
);

export interface MonoSynthProviderProps {
  options?: MonoSynthOptions;
  children?: ReactChildren;
}

export function MonoSynthProvider({
  options,
  children,
}: MonoSynthProviderProps) {
  const synth = useRef<MonoSynth | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!synth.current) {
      synth.current = new MonoSynth().toDestination();
      setIsLoaded(true);
    }

    return () => {
      synth.current?.dispose();
      synth.current = null;
      setIsLoaded(false);
    };
  }, []);

  return (
    <MonoSynthContext.Provider value={{ synth: synth.current }}>
      {isLoaded && children}
    </MonoSynthContext.Provider>
  );
}

export function useMonoSynth() {
  const { synth } = useContext(MonoSynthContext);

  return { synth };
}
