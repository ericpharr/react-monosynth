import { createContext, useContext } from "react";
import type { FrequencyEnvelopeOptions } from "tone";

export interface FilterEnvelopeContextValue {
  filterEnvelope: FrequencyEnvelopeOptions;
  setFilterEnvelope: (change: Partial<FrequencyEnvelopeOptions>) => void;
}

export const FilterEnvelopeContext = createContext(
  {} as FilterEnvelopeContextValue,
);

export function useFilterEnvelope() {
  const { filterEnvelope, setFilterEnvelope } = useContext(
    FilterEnvelopeContext,
  );

  return { filterEnvelope, setFilterEnvelope };
}
