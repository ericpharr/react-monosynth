import { useState, type ReactNode } from "react";
import { useMonoSynth } from "./MonoSynthContext";
import type { FrequencyEnvelopeOptions } from "tone";
import { FilterEnvelopeContext } from "./FilterEnvelopeContext";

interface FilterEnvelopeProviderProps {
  children: ReactNode;
}

export const FilterEnvelopeProvider = ({
  children,
}: FilterEnvelopeProviderProps) => {
  const { synth } = useMonoSynth();
  const [filterEnvelope, setFilterEnvelope] = useState(
    synth?.filterEnvelope.get() as FrequencyEnvelopeOptions,
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
