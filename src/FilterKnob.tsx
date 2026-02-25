import type { Frequency } from "tone/build/esm/core/type/Units";
import { useMonoSynthStore } from "./store";
import { NewKnob } from "./NewKnob";

export function FilterKnob() {
  const filterEnvelope = useMonoSynthStore((state) => state.filterEnvelope);
  const setFilterEnvelope = useMonoSynthStore(
    (state) => state.setFilterEnvelope,
  );

  const handleChange = (baseFrequency: Frequency) => {
    setFilterEnvelope({ baseFrequency });
  };

  return (
    <NewKnob
      label="freq"
      name="freq"
      scale="power"
      exponent={49 / 12}
      min={20}
      max={20000}
      step={0.01}
      value={filterEnvelope.baseFrequency as number}
      setValue={handleChange}
    />
  );
}
