import { createContext, ReactChildren, useContext, useState } from "react";
import { EnvelopeOptions } from "tone";
import { MonoSynthContext } from "./MonoSynthContext";

interface EnvelopeContextValue {
  envelope: EnvelopeOptions;
  setEnvelope: (change: Partial<EnvelopeOptions>) => void;
}

const EnvelopeContext = createContext<EnvelopeContextValue>(
  {} as EnvelopeContextValue
);

interface EnvelopeProviderProps {
  children: ReactChildren;
}

export const EnvelopeProvider = ({ children }: EnvelopeProviderProps) => {
  const { synth } = useContext(MonoSynthContext);
  const [envelope, setEnvelope] = useState(
    synth?.envelope.get() || ({} as EnvelopeOptions)
  );

  const changeEnvelope = (change: Partial<EnvelopeOptions>) => {
    const options = synth?.envelope.set(change).get();
    setEnvelope((state) => ({ ...state, options }));
  };

  return (
    <EnvelopeContext.Provider value={{ envelope, setEnvelope: changeEnvelope }}>
      {children}
    </EnvelopeContext.Provider>
  );
};

export function useEnvelope() {
  const { envelope, setEnvelope } = useContext(EnvelopeContext);

  return { envelope, setEnvelope };
}
