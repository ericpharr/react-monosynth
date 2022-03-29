import { useContext, useState } from "react";
import { useEffect, createContext, useRef, ReactChildren } from "react";
import { MonoSynth, MonoSynthOptions } from "tone";

interface MonoSynthContextValue {
  isLoaded: boolean;
  synth: MonoSynth | null;
}

export const MonoSynthContext = createContext<MonoSynthContextValue>({
  isLoaded: false,
  synth: null,
});

export interface MonoSynthProviderProps {
  options?: MonoSynthOptions;
  children?: ReactChildren;
}

export function MonoSynthProvider({
  options,
  children,
}: MonoSynthProviderProps) {
  const synth = useRef<MonoSynth | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    synth.current = new MonoSynth(options).toDestination();
    setIsLoaded(true);

    return () => {
      synth.current?.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MonoSynthContext.Provider value={{ isLoaded, synth: synth.current }}>
       {children}
    </MonoSynthContext.Provider>
  );
}

export function useMonoSynth() {
  const { isLoaded, synth } = useContext(MonoSynthContext);

  return { isLoaded, synth };
}
