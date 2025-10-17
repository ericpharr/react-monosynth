import { createContext, useContext, useState, type ReactNode } from "react";
import { useMonoSynth } from "./MonoSynthContext";
import type { FilterOptions } from "tone";

interface FilterContextValue {
  filter: FilterOptions;
  setFilter: (change: Partial<FilterOptions>) => void;
}

const FilterContext = createContext({} as FilterContextValue);

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const { synth } = useMonoSynth();
  const [filter, setFilter] = useState(synth?.get()?.filter as FilterOptions);

  const changeFilter = (change: Partial<FilterOptions>) => {
    const options = synth?.set({ filter: change }).get().filter;
    setFilter((filter) => ({ ...filter, ...options }));
  };

  return (
    <FilterContext.Provider value={{ filter, setFilter: changeFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export function useFilter() {
  const { filter, setFilter } = useContext(FilterContext);

  return { filter, setFilter };
}
