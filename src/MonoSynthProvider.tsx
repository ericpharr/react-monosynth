import { useEffect, useRef, useState } from "react";
import {
  MonoSynthContext,
  type MonoSynthProviderProps,
} from "./MonoSynthContext";
import { MonoSynth } from "tone";

export function MonoSynthProvider({
  options,
  children,
}: MonoSynthProviderProps) {
  const synth = useRef<MonoSynth | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!synth.current || !isLoaded) {
      synth.current = new MonoSynth(options).toDestination();
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
