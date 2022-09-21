import { Frequency } from "tone/build/esm/core/type/Units";
import { FrequencyRangeSlider } from "./FrequencyRangeSlider";
import { useFilterEnvelope } from "./FilterEnvelopeContext";

export function FilterKnob() {
  const { filterEnvelope, setFilterEnvelope } = useFilterEnvelope();

  const handleChange = (baseFrequency: Frequency) => {
    setFilterEnvelope({ baseFrequency });
  };

  return (
    <FrequencyRangeSlider
      scale="power"
      exponent={49 / 12}
      min={20}
      max={20000}
      step={0.01}
      value={filterEnvelope.baseFrequency as number}
      onChange={handleChange}
    />
  );
}
