import { createContext, ReactChildren, useContext, useState } from "react";
import { FrequencyEnvelopeOptions } from "tone";
import { useMonoSynth } from "./MonoSynthContext";

interface FilterEnvelopeContextValue {
  filterEnvelope: FrequencyEnvelopeOptions;
  setFilterEnvelope: (change: Partial<FrequencyEnvelopeOptions>) => void;
}

const FilterEnvelopeContext = createContext({} as FilterEnvelopeContextValue);

interface FilterEnvelopeProviderProps {
  children: ReactChildren;
}

export const FilterEnvelopeProvider = ({
  children,
}: FilterEnvelopeProviderProps) => {
  const { synth } = useMonoSynth();
  const [filterEnvelope, setFilterEnvelope] = useState(
    synth?.filterEnvelope.get() as FrequencyEnvelopeOptions
  );

  const changeFilterEnvelope = (change: Partial<FrequencyEnvelopeOptions>) => {
    const options = synth?.filterEnvelope.set(change).get();
    setFilterEnvelope((filter) => ({ ...filter, ...options }));
  };

  return (
    <FilterEnvelopeContext.Provider
      value={{ filterEnvelope, setFilterEnvelope: changeFilterEnvelope }}
    >
      {children}
    </FilterEnvelopeContext.Provider>
  );
};

export function useFilterEnvelope() {
  const { filterEnvelope, setFilterEnvelope } = useContext(
    FilterEnvelopeContext
  );

  return { filterEnvelope, setFilterEnvelope };
}
